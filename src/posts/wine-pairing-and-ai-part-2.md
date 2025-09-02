---
title: Wine Pairings and AI Part 2
slug: wine-pairings-and-ai-part-2
date: 2025-09-02
categories: programming, product-management, ai
summary: !
  Follow this technical product manager's journey back into coding through
  building a wine pairing AI app.
---

# From CLI to Web App: Building a No-Fuss AI Prototype Stack

I'm a technical product manager trying to ramp up on AI, just like all of you.
When I want to learn something new, I like to get my hands dirty with a project
so I can experience things for myself – including the good, bad, and the ugly. I
was a full-stack engineer for 10+ years before transitioning to product
management, but I haven't written any serious code since 2021, so this journey
was a mix of new things and familiar things for me.


Most wine pairing advice is generic — "red wine with red meat, white wine with fish" — but that's not helpful when you're making Thai basil chicken or your grandmother's complicated braised short rib recipe. So I built an app that reads your actual recipe and suggests wines based on the specific ingredients, cooking methods, and flavor profiles. You can try it at wine-suggestions.thedahv.com.

Full disclaimer: I happen to work at Amazon, but this is a home project I
pursued to guide my personal learning journey. These thoughts are my own and do
not represent any company mentioned here.

This is the second post in a series about building that app. In my first post, I
covered prompt engineering techniques. This post focuses on moving from working
CLI prototypes to a full-stack web app – specifically the developer experience
decisions that make AI prototyping fast and friction-free. The other posts will
cover using Claude Code to refactor from containers to serverless, leveraging
multiple AIs for DevOps work, and adding MCP tools to extend the app's
capabilities.

You can read the code for this post on [GitHub](https://github.com/TheDahv/wine-pairing-suggestions/releases/tag/v0.2.0).

Here's what I learned about building web apps around AI during that process.

## The Prototyping Challenge

I had working CLI tools that could summarize a recipe URL to generate wine
suggestions. I needed to turn that into something users could actually use from
their own devices. The challenge wasn't just in building a web app. I needed
minimal overhead and decisions to make since I was working in my spare time.

Whether it's prototyping or just building for fun, I don't want to spend time
fighting with build tools, ecosystems, and scaling concerns that solve problems
I don't have yet. The React world has gotten incredibly sophisticated, but that
comes with overhead and decisions to make about bundlers, state management,
routing and CSS before you get to any serious code.

I needed something simpler.

## My No-Fuss Prototyping Stack

Since backing off from full-time development, I wanted technologies that
would get me from idea to working prototype without decision fatigue.

### Go for Backend Simplicity

Go felt familiar and committed to the simplicity I wanted: self-contained
binaries, built-in HTTP server, and minimal external dependencies. The language
hasn't changed dramatically since 2021, and the standard library covers most of
what you need for a simple web app.

This includes a feature-filled routing system baked in. Go 1.22 added a route
path feature that simplified passing parameters through URLs:

```go
// Before: parsing query parameters or using third-party routers
// Now: clean path parameters built into the standard library
func (wa *Webapp) GetRecipeWineSuggestions(w http.ResponseWriter, r *http.Request) {
    u := r.PathValue("url")  // Gets URL from /recipes/suggestions/{url}
    // ...
}
```

This felt more semantically correct than relying on query parameters for required data.

### AlpineJS for Reactive UI Without the Overhead

For the frontend, I wanted something reactive but simple. I was able to find
that in [AlpineJS](https://alpinejs.dev/) that features reactive data binding
and state management without build tools, bundlers, or complex ecosystem
decisions.

Their home page shows the installation and setup story better than I could:

```html
<script src="//unpkg.com/alpinejs" defer></script>
 
<div x-data="{ open: false }">
    <button @click="open = true">Expand</button>
 
    <span x-show="open">
        Content...
    </span>
</div>
```

While I appreciate Alpine's "just write HTML" focus that leans on decorating
components with HTML directives, I was most attracted to the state management
aspect. You describe your application's data as a plain old JavaScript object.
Methods manage changes and Alpine handles the binding for interface updates.
Even better: async functions let you manage side effects and state updates.

Here's how I structured the wine pairing interface:

```js
Alpine.store('recipe', {
    summaryState: 'NOT_STARTED',
    suggestionsState: 'NOT_STARTED',
    url: '',
    summary: '',
    suggestions: [],
    reset() {
        this.summaryState = 'NOT_STARTED';
        this.suggestionsState = 'NOT_STARTED';
        this.summary = '';
        this.suggestions = [];
    },
    async fetch() {
        const url = this.url;
        if (!url) return;

        this.reset();
        try {
            this.summaryState = 'FETCHING';
            const result = await fetch(`/recipes/summary/${encodeURIComponent(url)}`, {
                method: 'POST',
                headers: { 'Accept': 'application/json' }
            });
            const parsed = await result.json();
            this.summary = parsed.summary;
            this.summaryState = 'SUCCESS';
        } catch (error) {
            this.summaryState = 'ERROR';
            this.summaryError = error.message;
        }
        // Similar pattern for wine suggestions...
    }
});
```

[HTMX](https://htmx.org/) gets an honorable mention here – I'll likely try it
next time if my app involves multiple views rather than this single-view
experience. For multi-view applications, HTMX's server-rendered HTML approach
might scale better than Alpine's client-side state management. However, it did
too much that I didn't need and too little of what I was looking for in this
project.

### Bulma CSS for Design Without Decisions

For styling, I used [Bulma CSS](https://bulma.io) – a modern CSS framework
that's clean, responsive, and requires minimal customization decisions. Drop it
in, use the classes, and move on to the important stuff.

## AI as Your Backend Logic

If you've interacted with the app, you might have noticed you're not talking to
a chatbot to get wine suggestions. So, this is a good moment to define what
makes something an "AI app". The way I see it, "chatbot" is just a UX pattern
for interacting with LLMs. In fact, LLMs power many apps you use without letting
the user interact with it directly. For the sake of user safety and my back
account, that's how this app works. Users interact with a traditional HTML
interface for this app that makes requests to the LLM on their behalf with
pre-written prompts, leading to safer and more predictable results.

This changes how you think about backend architecture. Instead of endpoints that
map to algorithms and database queries, I built endpoints that map to prompts
and model calls:

```go
func GeneratePairingSuggestions(ctx context.Context, model llms.Model, summary string) (string, error) {
    prompt := fmt.Sprintf(`
    Suggest approachable wine pairings for this dish. Focus on accessible wines people can actually find.

    <RECIPE_SUMMARY>
    %s
    </RECIPE_SUMMARY>

    Generate 5-10 wine pairings as JSON array. For each wine:
    - Match the dish's weight and primary flavors
    - Choose wines available at most wine shops
    - Explain pairing logic simply

    JSON format (exact structure required):
    [
        {
            "style": "wine style name",
            "region": "specific region", 
            "description": "one sentence about the wine",
            "pairingNote": "one sentence why it pairs well"
        }
    ]`, summary)

    answer, err := llms.GenerateFromSinglePrompt(ctx, model, prompt)
    if err != nil {
        return "", fmt.Errorf("failed to generate wine suggestions: %v", err)
    }
    return answer, nil
}
```

Writing code to map from recipe flavor profiles to wines would have required
significant investment in algorithm design, data gathering, model training, and
validation. Instead, I implemented endpoints as prompts and model calls – logic
I can either replace with traditional services later or continue fine-tuning
through prompt optimization.

### Caching for Cost, Determinism, and Speed

Having prompts and model calls as service endpoints created new considerations
around cost, determinism, and latency. Caching helped with all three:

```go
suggestions, err := wa.cache.Get(fmt.Sprintf("recipes:suggestions-json:%s", u), func() (string, error) {
    // Only charge quota on cache miss
    return models.GeneratePairingSuggestions(ctx, wa.model, summary)
})
```

**Cost structures**: Most LLMs charge by inbound and outbound tokens. Caching
means avoiding repeated model invocations for the same question costs 0 tokens.

**Determinism**: Users expect the same result for the same recipe. LLMs have
randomness built in, but caching solves this by returning the first response
for all subsequent calls.

**Latency**: Pulling a pre-generated response feels much faster than waiting for
model inference.

Go interfaces made it easy to start with in-memory implementations that I later replaced with Redis for development and AWS Valkey (ElastiCache) in production.

## Development Workflow

For local development, I used Docker Compose to manage the app and cache layer:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    volumes:
      - .:/app:cached
    depends_on:
      - redis
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

I used [air](https://github.com/air-verse/air) to manage builds and restarts
when I changed server or UI code. The `:cached` volume directive ensured code
changes on my laptop synced quickly into the running container.

This setup let me iterate on both prompt tuning and web development
simultaneously – change a prompt or adjust the interface, restart the server,
test in the browser, repeat.

## Deployment to AWS ECS

Deploying to AWS ECS was mostly straightforward, though I hit a few learning
curve moments around VPC configuration. The main gotcha: making sure ACL rules
allow incoming HTTPS traffic to reach the load balancer.

Containerization minimized differences between local and production
environments. Having the AWS CLI installed meant everything could be scripted.

But running an always-on container with an AWS Application Load Balancer is
expensive for a simple prototype. I was paying for resources that weren't
getting utilized most of the time. This inspired my migration to serverless
architecture, which I'll cover in the next post.

## AI as Design Partner

I didn't use AI in my IDE for this round, but I did discover something
interesting: Claude Desktop excelled at subjective, creative tasks like brand
identity work.

I used it to generate a visual style guide for the wine app. It leveraged its
existing knowledge of Bulma CSS to create style variables and overrides that
matched my vision of "clean, simple, approachable, and elegant."

The process was collaborative: I'd describe what I wanted, Claude would generate
CSS and design artifacts, I'd evaluate the results and give feedback, then
iterate until I had a theme I liked. This kind of back-and-forth creative work
felt natural and productive in ways that pure code generation sometimes doesn't.

Here's a snippet from my prompt to prepare a brand itentity and visual style guide:

```txt
I want style guide and visual aesthetic guidance for a web app I'm making that
makes wine pairing suggestions for its users based on the meal they're
preparing. Some subjective terms I want the visual design to inspire in the user
are: clean, simple, approachable, and elegant. Anything that makes a node to
wine would be important.

What can you offer in terms of: overall brand guide including typography, color
pallet, layout, and design inspiration?
```

Then, we turned the visual identity in to Bulma CSS customizations, using a
"generate, test, give feedback" loop to get the final product:

```txt
The following are CSS variables for the framework I'm using. Can you replace
these values with the styleguide you created? <CSS code pasted here>
```

## Developer Experience Takeaways

**For Developers Building AI Prototypes**: 
- Choose technologies that minimize decision overhead. You want to spend time on AI problems, not tooling problems.
- Consider AI-as-backend-logic early in your architecture. It changes cost, caching, and reliability considerations.
- Docker Compose + hot reloading creates a tight feedback loop for prompt and code iteration.

**For Developers Considering Modern Stacks**:
- AlpineJS offers reactive patterns without React's ecosystem complexity for single-view apps.
- Go's standard library improvements (especially routing) reduce dependency needs.
- Sometimes "boring" technology choices accelerate prototyping better than cutting-edge frameworks.

**For Product Managers**:
- AI backends have different cost structures than traditional services. Caching becomes a product decision, not just a performance optimization.
- The "chatbot" UX is one option, not the default. Traditional interfaces calling pre-written prompts can be safer and more predictable.
- Prototype technology choices impact iteration speed, which affects how quickly you can validate AI product ideas.

---

*This is the second post in a series about building an AI-driven app. Next up:
using Claude Code to refactor from containers to serverless architecture.*
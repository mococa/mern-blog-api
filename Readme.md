# MERN Blog Example

I made this to train a little more UI designing, responsive UI, CORS, Image upload services, Context API, Mongo, Cookies, Styled-Components and Hashing passwords, cause I was feeling a little awkward with them. Managed to solid up the knowledge and understand better the Stack.

Also, I hosted it all for free on Repl.it and Freenom. Had issues with Cloudflare, so no more cloudflare. Probably their new UI lol.

---
You can check the demo here:

https://blog.mococa.tk/

<details>
  <summary>Other repos used:</summary>

  > https://github.com/mococa/mern-blog-cms

  > https://github.com/mococa/mern-blog-frontend

</details>

### Cookies

I stored a JWT, called `jwt` to authenticate requests. I kinda got a hate on local storage since last month or so, so I wanted to solidify what I know with cookies and jwt so all my next projects use it.

Also, used a function to clear the cookies on the front-end. Making it easier to deal it sometimes

---

### CORS

I pretty **ALWAYS** have issues with it, setting up my Express servers. Now, it only accepts requests coming from some URLs on `.env`. Making it more safe.

---

### Context API

Managed to create my own Toastr notifier with it. I created a custom toastr component with `styled-components` and it worked just as expected. I must admit I got stuck in there a little due to rerendering and managed to solve it setting the state that stores the stack of toastrs differently than I usually do.

Like this:

```js
setState((oldState) => changeState(oldState));
```

Also used context API to store the blog posts, authentication info and theming

---

### Styled components

Managed to create a changeable theme with it. I had never tried to make one. Great experience with it and probably gonna use in my future projects. Bye bye Material UI (kidding. maybe not)

---

### Mongo

With mongo, used the populate function and implemented pagination, things which I also never really did. Did not felt much difficulties in there. Regular stuff.

---

### Hashing password

Since big companies DB leak, it started to bug me off a little continuing storing passwords as pure unmodified text. Relearnt how to implement it with BCrypt and worked very well

---

### UI

Although the interface is not **SUPER DUPER COOL**, I'm happy with it. I'd use a website like this.

---

### Images

For this project, I used ImgBB because it's **EXTREMELY** easy to implement as you can check in the code. And then, I store only the returned URL on the database.

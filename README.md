# Mail

This is a resend email sending web application built with NextJS, Password protected.

<p>

<a href="https://vercel.com/tech-art/mail" target="_blank"><img src="https://vercelbadge.vercel.app/api/Dev-Huang1/Mail?style=flat-square" alt="Vercel Project Status"></a>
<a href="https://github.com/Dev-Huang1/Mail/blob/master/LICENSE" target="blank"><img src="https://img.shields.io/github/license/Dev-Huang1/Mail?style=flat-square" alt="license"></a>
<a href="https://github.com/Dev-Huang1/Mail/fork" target="blank"><img src="https://img.shields.io/github/forks/Dev-Huang1/Mail?style=flat-square" alt="forks"></a>
<a href="https://github.com/Dev-Huang1/Mail/stargazers" target="blank"><img src="https://img.shields.io/github/stars/Dev-Huang1/Mail?style=flat-square" alt="stars"></a>
<a href="https://github.com/Dev-Huang1/Mail/issues" target="blank"><img src="https://img.shields.io/github/issues/Dev-Huang1/Mail?style=flat-square" alt="issues"></a>
<a href="https://github.com/Dev-Huang1/Mail/pulls" target="blank"><img src="https://img.shields.io/github/issues-pr/Dev-Huang1/Mail?style=flat-square" alt="pull-requests"></a>

</p>

## UI

![Password](https://github.com/user-attachments/assets/286c3bad-83e1-4ff6-acc9-9a27e8db8d7d)

![UI](https://github.com/user-attachments/assets/5fc6b928-69c4-42c1-a808-f65621462bdc)

## Built with

- NextJS
- TypeScript
- Resend
- shadcn/ui

## Deploy

Get the [Resend API KEY](https://resend.com)

> [!NOTE]\
> How to get Resend API KEY? 
> [Learn the doc](https://resend.com/docs/dashboard/api-keys/introduction)


Then fill in the .env file: 

```env
RESEND_API_KEY=YOUR_RESEND_API_KEY
```

And fill in your access password:

```env
ACCESS_PASSWORD=123456
```

Then run 

```
npm run dev
```

Finally, open your browser and visit [https://localhost:3000/](https://localhost:3000/)

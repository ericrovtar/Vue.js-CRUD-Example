# ACS Code Challenge - Eric Rovtar

> A Vue.js project to complete the code challenge for ACS Technologies

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Considerations / Reasonings

## Why Vue?
You mentioned that Vue was a framework you had been looking into and it's also a framework I've heard 
a lot about, so I wanted to see it in action. Being familiar with Angular and React, I figured a lot
would translate over.

## Mobile First
I adhere strongly to a mobile-first mentality. In this application, that is difficult as we're dealing
with a table of data. Tables do not lend themselves well to mobile interfaces.

Again, to keep the application simple, I only used two viewports: desktop and portable. Even with those
two, I applied my simple solution of limiting the columns on a portable device.

This led to the inclusion of a View option, which might seem unnecessary on a desktop display when you 
have all the data laid out before you. This becomes a requirement when dealing with smaller displays. 
Plus, it's nice to have a good-looking layout that shows all the fields of a single object without any 
clutter.

## Separating CSS from Vue
I'm a huge fan of SASS. I also am a fan of Compositional CSS, where more generic, reusable classes are
created and applied as needed. This unbinds the CSS from the content, and - while you might end up 
using more classes per element - you also end up with a better understanding of what is being applied
to each element. Vue's method of handling CSS is stronly tied to each component.

## Why Does `dataProperties` Exist?
Whenever working with any kind of database, you're going to have to have some sort of schema stored 
somewhere. In C#, this usually is just a class structure; the properties representing a column and, 
their respective types, restrictions on the value. 

At first, my idea was to load the schema directly from the first object returned when the table was 
loaded, but I realized there were a few short comings to this. First, I couldn't properly format the 
field titles (ex: `id` became "Id," which sets off my OCD). Second, there wasn't a good way to 
determine required values. Third, I had no way of validating a value type. Finally, there were going 
to be values that I didn't need to POST (ex: id, created_at, updated_at), so - while they appeared to 
simply be ignored when sent via POST - it seemed unnecessary and cleaner to only send the data that 
was needed.

Considering all of this and to help keep this application simple, the best means to store a schema was 
to encode it in a JavaScript object. Were the project to grow, with user options to extend the database 
(ex: a CMS), then I'd re-evaluate this decision and come up with a better option.

## Why No Consistent Phone Number Format?
I considered spending time to give a unified look to the phone numbers, and - while possible - it
seemed like a misue of time because I would be applying a patch rather than fixing the problem. Were
this my project, I'd choose to fix the database entries first and store each phone number a string of
only numbers, without any formatting. Then I'd format the string however I saw fit.
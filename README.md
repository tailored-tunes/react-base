#React Webpack skeleton

There are things that you do with every project, like set up your environment and make sure that the code is
up to your standards.

This repository contains such a project skeleton for React.

## What is in the skeleton?

- The dev server to allow you to see what you're doing
- React hot loader to allow for fast development cycles
- Babel to allow you to write your javascript with the ES6 syntaxt
- SCSS compiler to allow you to use SCSS instead of css
- Bundling the generated css into an external file so it could be cached
- Standards
	- Eslint on your javascript files to make sure the code is syntactically correct
	- Stylelint on your SCSS files to make sure the scss adheres to a standard
- Postprocessors for the generated css
	- autoprefixer - that adds all the browser prefixes to the supported browsers
	- cssnano - minifies the generated css

## To install all the things
`yarn install`

## How to use

### To run the server
`yarn start`

### To build
`webpack`

This will generate all the files, but will not create hashed file names or minimise at all 

### To package for production
`yarn production`

This will generate hashed file names and minimise the files

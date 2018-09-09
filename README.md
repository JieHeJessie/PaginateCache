# PaginateCache

This project is used to build a cache of items on the front-end to achieve instant pagination.

## Supported Platforms
The project can be run in MacOS, Windows or Linux 

## Pre-requisites
In order to easily setup and manage all the development dependencies, setting up the "npm"

## Startup running the application

Run the following command to startup the application
```
git clone https://github.com/JieHeJessie/PaginateCache
cd PaginateCache
npm install
npm start

```

## Total time taken to build the app
3 days

## Assumption

1. “n” is the current index of page

2. “predicted-cache” is the most likely page for the user to see next. Here we assume that the user is most likely to see the first three pages and the last three pages of the nth page. 
For example, if it is currently on page 5, then the pages that the user is most likely to see next is page 2, 3, 4, 6, 7, 8

3. “actual-cache” is the actual cache content

## Code logic

1. The first time loading the page, it will load the page 1.

2. When the component detects a change in the page, it begins processing the cache as follows:

```
if (actual-cache.length <8)
  If there are items of "predictive cache" in the "actual cache", then skip it
  If not, then add the content to the "actual cache"
```

```
if (actual-cache.length  >= 8)
  Delete the page that is farthest from the current page and add the content of the new prediction.
```



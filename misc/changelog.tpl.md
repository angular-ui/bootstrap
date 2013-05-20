# <%= version%> (<%= today%>)

## Features

<% _(changelog.feat).forEach(function(changes, component) { %>
- **<%= component%>:**
  <% changes.forEach(function(change) { %>
  - <%= change.msg%> ([<%= change.sha1%>](https://github.com/angular-ui/bootstrap/commit/<%= change.sha1%>))
  <% }) %>
<% }) %>

## Bug Fixes

<% _(changelog.fix).forEach(function(changes, component) { %>
- **<%= component%>:**
  <% changes.forEach(function(change) { %>
  - <%= change.msg%> ([<%= change.sha1%>](https://github.com/angular-ui/bootstrap/commit/<%= change.sha1%>))
  <% }) %>
<% }) %>

## Breaking Changes

<% _(changelog.breaking).forEach(function(changes, component) { %>
- **<%= component%>:**
  <% changes.forEach(function(change) { %>
  <%= change.msg%>
  <% }) %>
<% }) %>


# <%= version%> (<%= today%>) 

<% if (_(changelog.feat).size() > 0) { %> ## Features
<% _(changelog.feat).forEach(function(changes, scope) { %>
- **<%= scope%>:**
  <% changes.forEach(function(change) { %> - <%= change.msg%> (<%= helpers.commitLink(change.sha1) %>)
  <% }); %>
<% }); %> <% } %>

<% if (_(changelog.fix).size() > 0) { %> ## Fixes
<% _(changelog.fix).forEach(function(changes, scope) { %>
- **<%= scope%>:**
  <% changes.forEach(function(change) { %> - <%= change.msg%> (<%= helpers.commitLink(change.sha1) %>)
  <% }); %>
<% }); %> <% } %>

<% if (_(changelog.breaking).size() > 0) { %> ## Breaking Changes
<% _(changelog.breaking).forEach(function(changes, scope) { %>
- **<%= scope%>:**
  <% changes.forEach(function(change) { %> <%= change.msg%>
  <% }); %>
<% }); %> <% } %>

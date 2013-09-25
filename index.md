---
layout: page
title: Teacher_Xiao
tagline: 教学工作和自我成长
---
{% include JB/setup %}
***<li><a href="/about">我是谁？</a></li>***

## 所有文章

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>



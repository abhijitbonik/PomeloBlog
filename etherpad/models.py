from django.db import models
from blog.models import Blog
from django.contrib.auth.models import User

class EtherBlog(models.Model):
    blog = models.OneToOneField(Blog, related_name='ether_blog')
    etherid = models.TextField()
    groupid = models.TextField(null=True)

class EtherUser(models.Model):
    user = models.ForeignKey(User, related_name='ether_user')
    user_ether_id = models.TextField()

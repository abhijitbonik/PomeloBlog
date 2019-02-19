from django.db import models
from django.contrib.auth.models import User
import os, uuid

def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('blog', filename)

states = (
        ('Draft', 'Draft'),
        ('Publish', 'Publish'),
    )

class Blog(models.Model):
	title = models.CharField(max_length=100)
	body = models.TextField(null=True)
	image = models.ImageField(null=True,upload_to=get_file_path)
	created_at = models.DateTimeField(auto_now_add=True)
	created_by = models.ForeignKey(User,on_delete=models.CASCADE, related_name='blog_author')
	published_on=models.DateTimeField(null=True)
	views = models.PositiveIntegerField(default=0)
	status = models.CharField(default='Draft', max_length=50, choices = states)
	category = models.ForeignKey('categories.Category', null=True)
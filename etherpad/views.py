from django.shortcuts import render
from py_etherpad import EtherpadLiteClient
from django.conf import settings
from .models import  EtherBlog, EtherUser
from time import time

class Etherpad:
    def __init__(self):
        self.epclient = EtherpadLiteClient(settings.APIKEY, settings.APIURL)
        
    def create_ether_blog(self, blog):
        groupid =  self.epclient.createGroupIfNotExistsFor(str(blog.uuid))
        padid =  self.epclient.createGroupPad(groupid['groupID'], blog.pk)
        blog = EtherBlog.objects.create(blog=blog, etherid=padid['padID'], groupid=groupid['groupID'])
        return blog

    def create_ether_user(self, user):
        result = self.epclient.createAuthorIfNotExistsFor(user.id, user.username)
        user = EtherUser.objects.create(user=user, user_ether_id= result['authorID'])
        return user

    def create_session_group(self, request, groupid):
        ethergroup = str(groupid)
        try:
            etheruser = EtherUser.objects.get(user=request.user)
        except Exception:
            etheruser = self.create_ether_user(request.user)
        etheruser = str(etheruser.user_ether_id)
        validUntil = int(time())+28800
        result = self.epclient.createSession(ethergroup, etheruser, validUntil)
        return result['sessionID']

    def getHTML(self, blog):
        blog = EtherBlog.objects.get(blog=blog)
        result =  self.epclient.getHtml(blog.etherid)
        return result['html']


    def getText(self, blog):
        blog = EtherBlog.objects.get(blog=blog)
        result =  self.epclient.getText(blog.etherid)
        return result['text']

    def deletePad(self, blog):
        article = EtherBlog.objects.get(blog=blog)
        self.epclient.deletePad(blog.etherid)
        return 


    def get_pad_usercount(self, blog):
        count = self.epclient.padUsersCount(blog.etherid)
        return count['padUsersCount']

    def get_read_only_padid(self, blog):
        readonly = self.epclient.getReadOnlyID(blog.etherid)
        return readonly['readOnlyID']


from django.conf.urls import url

from .views import MediaUploadView

urlpatterns = [
    url(r'^create/$', MediaUploadView.as_view(), name='create'),
]
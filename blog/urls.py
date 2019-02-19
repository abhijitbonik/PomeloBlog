from django.conf.urls import url

from .views import BlogCreateApiView, BlogListApiView, BlogRUDApiView

urlpatterns = [
    url(r'^$', BlogListApiView.as_view(), name='list'),
    url(r'^create/$', BlogCreateApiView.as_view(), name='create'),
    url(r'^detail/(?P<pk>\d*)/$', BlogRUDApiView.as_view(), name='create'),
]
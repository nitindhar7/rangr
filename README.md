![Rangr Logo](http://bit.ly/GA6sWK) RANGR - Notifications for Forrst 
====================================================================

### OVERVIEW

Rangr is a Google Chrome extension that pulls a users notification data from Forrst.com and presents it in the browser in a 
soft, non-intrusive manner. Install Rangr from the [Chrome Web Store](https://chrome.google.com/webstore/category/home).

* * *

### ARCHITECTURE

1. **Login Controller/View:** dialog box where user enters their credentials
2. **Auth Controller:** contact Forrst.com to obtain the auth token
3. **Base Controller:** background page as a controller
4. **Notification View:** pop-ups that open when a notification is detected
5. **Rangr Storage DAO:** CRUD for users access token

* * *

### DETAILS

##### Login Controller/View

When installed, a Rangr icon will appear to the right of the browsers address bar. Clicking this icon opens up 
the login view with a form. The user will enter their credentials here and press submit. On submit, the credentials
will be passed on to the *Auth Controller*

##### Auth Controller

The auth controller manages a users activity session. When a user logs in their credentials are collected here and a call
to Forrst.com is made. The response to this call contains the users authentication token (if successful), which is stored
to local storage via the *Rangr Storage DAO*. Logout functionality is also resident in this module. On logout, a users
access token is deleted from storage.

##### Base Controller

*Base Controller* is Rangrs core module as it contains logic to fetch notification data from Forrst on start up as well as
on a recurring schedule. *Notification View*s are triggered when the users account has pending notifications. Each notification 
will be displayed in an individual view when 2 or less notifications are present. Otherwise, notifications will be grouped up 
and only the # of notifications will be displayed. When such a notification box is clicked the current tab is redirected to
the Forrst.com notifications page. On the other hand, when no notifications are present a dialog box mentioning this will be presented
only on startup.

Example notification creation:

```javascript
var notification = new Notification(icon url, title, body).build();
notification.show();
```

##### Notification View

Notifications are presented to the user in mini-dialog boxes on the window when this extension is installed. Each notification
contains an icon representing the post type from Forrst.com as well as the notification type, title, body, etc. When a *Notification
View* is clicked the current tabs URL is changed to the notifications page at Forrst.com.

##### Rangr Storage DAO

A simple data access object which saves the authentication token to local storage if login is successful and returns it on demand.

* * *

### UP NEXT

- Options page with notification refresh frequency
- Instant reply to notification
- Tweet notification
- Option to load latest post every XX seconds
- Number of notifications in Rangr browser icon
- Reply button

* * *

### TODO

- UI improvement
- Remove white glow around "RANGR" logo text
- OOCSS for views (maybe)
- Media Assets:

Screenshots
1280w x 800h
640w x 400h

App Icon
128w x 128h
16w x 16h
19w x 19h
48w x 48h
128w x 128h

Promotional Images
440w x 280h
920w x 680h
1400w x 560h

* * *

Copyright (c) 2012 Nitin Dhar. See [MIT-LICENSE](https://github.com/nitindhar7/rangr/blob/master/MIT-LICENSE) for details.
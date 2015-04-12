YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [],
    "modules": [
        "config",
        "controllers",
        "models",
        "tasks"
    ],
    "allModules": [
        {
            "displayName": "config",
            "name": "config",
            "description": "Set up the environment on the server.\nInitializes libraries such as express, passport, and handlebars.\nconfig/environment.js"
        },
        {
            "displayName": "controllers",
            "name": "controllers",
            "description": "This file provides helper functions related to the api.\napp/controllers/_apiHelpers.js"
        },
        {
            "displayName": "models",
            "name": "models",
            "description": "This files is used to create the action model. Actions will be\nused for an audit log. Closely related to the activity model.\napp/models/action.js"
        },
        {
            "displayName": "tasks",
            "name": "tasks",
            "description": "This file is used to load default actions into the database via the\norm.\nnode tasks/defaultActions"
        }
    ]
} };
});
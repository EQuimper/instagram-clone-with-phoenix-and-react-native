package com.instagramclone;

import com.reactnativenavigation.controllers.SplashActivity;
import android.content.Intent;

public class MainActivity extends SplashActivity {

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
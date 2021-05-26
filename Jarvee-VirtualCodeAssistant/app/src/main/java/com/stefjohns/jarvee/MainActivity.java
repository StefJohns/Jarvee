package com.stefjohns.jarvee;

import androidx.appcompat.app.AppCompatActivity;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.widget.TextView;

import com.alan.alansdk.AlanCallback;
import com.alan.alansdk.AlanConfig;
import com.alan.alansdk.button.AlanButton;
import com.alan.alansdk.events.EventCommand;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    private WebView jarveeWebView;
    private TextView jarveeTextView;
    private int shortAnimationDuration;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Alan Button
        AlanButton alan_button = findViewById(R.id.alan_button);

        // Alan Config
        AlanConfig config = AlanConfig.builder()
                .setProjectId("7835432a36e0dd35fdb3c6473fdc2e8e2e956eca572e1d8b807a3e2338fdd0dc/stage")
                .build();
        alan_button.initWithConfig(config);

        // WebView
        jarveeWebView = findViewById(R.id.jarveeWebView);
        jarveeWebView.setVisibility(View.GONE);

        // Jarvee Text View
        jarveeTextView = findViewById(R.id.jarveeTextView);
        jarveeTextView.setText("Hello! Press the blue button in the top left, to ask me a question. You can say something like, 'Show me the guidelines'");

        shortAnimationDuration = getResources().getInteger(android.R.integer.config_shortAnimTime);

        // Alan Command Handler
        AlanCallback webCallback = new AlanCallback() {
            @Override
            public void onCommandReceived(EventCommand eventCommand) {
                super.onCommandReceived(eventCommand);
                String commandData = null;
                String dataToDisplay = null;
                JSONObject commandObject = null;
                try {
                    commandObject = eventCommand.getData().getJSONObject("data");
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                try {
                    assert commandObject != null;
                    commandData = commandObject.getString("command");
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                assert commandData != null;

                // if command = show web page
                if (commandData.equals("showWebPage")){
                    try {
                        dataToDisplay = commandObject.getString("page_url");
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    crossfadeWebView();
                    jarveeWebView.loadUrl(dataToDisplay);
                }

                if(commandData.equals("jarveeResponse")) {
                    try {
                        dataToDisplay = commandObject.getString("responseText");
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    crossfadeTextView();
                    jarveeTextView.setText(dataToDisplay);
                }
            }
        };
        alan_button.registerCallback(webCallback);
    }

    private void crossfadeWebView() {
        jarveeWebView.setAlpha(0f);
        jarveeWebView.setVisibility(View.VISIBLE);

        jarveeWebView.animate()
                .alpha(1f)
                .setDuration(shortAnimationDuration)
                .setListener(null);

        jarveeTextView.animate()
                .alpha(0f)
                .setDuration(shortAnimationDuration)
                .setListener(new AnimatorListenerAdapter() {
                    @Override
                    public void onAnimationEnd(Animator animation) {
                        jarveeTextView.setVisibility(View.GONE);
                    }
                });
    }
    private void crossfadeTextView() {
        jarveeTextView.setAlpha(0f);
        jarveeTextView.setVisibility(View.VISIBLE);

        jarveeTextView.animate()
                .alpha(1f)
                .setDuration(shortAnimationDuration)
                .setListener(null);

        jarveeWebView.animate()
                .alpha(0f)
                .setDuration(shortAnimationDuration)
                .setListener(new AnimatorListenerAdapter() {
                    @Override
                    public void onAnimationEnd(Animator animation) {
                        jarveeWebView.setVisibility(View.GONE);
                    }
                });
    }
}
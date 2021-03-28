package com.stefjohns.jarvee;

import androidx.appcompat.app.AppCompatActivity;

import android.content.res.ColorStateList;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.widget.TextView;

import com.alan.alansdk.AlanCallback;
import com.alan.alansdk.AlanConfig;
import com.alan.alansdk.button.AlanButton;
import com.alan.alansdk.events.EventCommand;
import com.alan.alansdk.events.EventText;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Console;

public class MainActivity extends AppCompatActivity {

    WebView webView;
    TextView jarveeText;
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
        webView = findViewById(R.id.rulesWebView);
        webView.loadUrl("http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#c-classes-and-class-hierarchies");
        webView.setVisibility(View.GONE);

        // Jarvee Text View
        jarveeText = findViewById(R.id.jarveeTextView);
        jarveeText.setText("Hello! Press the blue button in the top left, to ask me a question. Or, you could just say 'Hey Alan'");

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
                    jarveeText.setVisibility(View.GONE);
                    webView.setVisibility(View.VISIBLE);
                    webView.loadUrl(dataToDisplay);
                }

                // If command = show bad code
                if (commandData.equals("showCodeExample")) {
                    try {
                        dataToDisplay = commandObject.getString("badCode");
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    webView.setVisibility(View.GONE);
                    jarveeText.setVisibility(View.VISIBLE);
                    jarveeText.setText(dataToDisplay);
                }

                // If command = show Good Code
                if (commandData.equals("showCodeExample")) {
                    try {
                        dataToDisplay = commandObject.getString("goodCode");
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    webView.setVisibility(View.GONE);
                    jarveeText.setVisibility(View.VISIBLE);
                    jarveeText.setText(dataToDisplay);
                }

                if(commandData.equals("jarveeResponse")) {
                    try {
                        dataToDisplay = commandObject.getString("responseText");
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    webView.setVisibility(View.GONE);
                    jarveeText.setVisibility(View.VISIBLE);
                    jarveeText.setText(dataToDisplay);
                }
            }
        };
        alan_button.registerCallback(webCallback);
    }
}
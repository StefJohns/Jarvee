package com.stefjohns.jarvee;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.webkit.WebView;

import com.alan.alansdk.AlanConfig;
import com.alan.alansdk.button.AlanButton;

public class MainActivity extends AppCompatActivity {

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
        WebView webView = (WebView) findViewById(R.id.rulesWebView);
        webView.loadUrl("http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#c-classes-and-class-hierarchies");
    }
}
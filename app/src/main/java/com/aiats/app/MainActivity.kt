package com.aiats.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val recyclerView = findViewById<RecyclerView>(R.id.applications_list)
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = ApplicationAdapter(sampleApplications())
    }

    private fun sampleApplications(): List<JobApplication> = listOf(
        JobApplication("Senior Android Engineer", "TechCorp", "Interview Scheduled"),
        JobApplication("Mobile Developer", "StartupAI", "Applied"),
        JobApplication("Kotlin Engineer", "CloudWorks", "Offer Received")
    )
}

data class JobApplication(
    val title: String,
    val company: String,
    val status: String
)

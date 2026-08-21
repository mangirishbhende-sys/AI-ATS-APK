package com.aiats.app

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class ApplicationAdapter(
    private val applications: List<JobApplication>
) : RecyclerView.Adapter<ApplicationAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val title: TextView = view.findViewById(R.id.job_title)
        val company: TextView = view.findViewById(R.id.company_name)
        val status: TextView = view.findViewById(R.id.application_status)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_application, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val application = applications[position]
        holder.title.text = application.title
        holder.company.text = application.company
        holder.status.text = application.status
    }

    override fun getItemCount(): Int = applications.size
}

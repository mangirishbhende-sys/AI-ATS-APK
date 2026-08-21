package com.aiats.app

import org.junit.Test
import org.junit.Assert.*

class JobApplicationTest {
    @Test
    fun sampleApplicationHasExpectedStatus() {
        val application = JobApplication("Engineer", "TechCorp", "Applied")
        assertEquals("Applied", application.status)
    }
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, ChevronRight, ChevronDown, Plus } from "lucide-react"

export function AIPageBuilder() {
  const [isRefining, setIsRefining] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(["objectives", "timeline"])
  const [checkedItems, setCheckedItems] = useState<string[]>(["task1", "task3"])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const toggleCheckItem = (itemId: string) => {
    setCheckedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const handleRefine = () => {
    setIsRefining(true)
    setTimeout(() => {
      setIsRefining(false)
    }, 2000)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Q1 Product Launch Plan</h1>
          <p className="text-gray-600">AI-generated structured page with actionable content</p>
        </div>
        <Button onClick={handleRefine} disabled={isRefining} className="gap-2">
          <Sparkles className="w-4 h-4" />
          {isRefining ? "Refining..." : "Refine Page with AI"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Executive Summary */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed">
              This comprehensive plan outlines our Q1 product launch strategy, including key objectives, timeline,
              resource allocation, and success metrics. The launch focuses on introducing our new AI-powered features to
              enhance user productivity and engagement.
            </p>
          </CardContent>
        </Card>

        {/* Objectives Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 cursor-pointer mb-4" onClick={() => toggleSection("objectives")}>
              {expandedSections.includes("objectives") ? (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              )}
              <h2 className="text-xl font-semibold text-gray-900">🎯 Key Objectives</h2>
            </div>

            {expandedSections.includes("objectives") && (
              <div className="space-y-3 ml-7">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Achieve 25% increase in user engagement within first month</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Onboard 10,000+ new users in Q1</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Generate $500K in additional revenue</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Establish market presence in 3 new regions</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timeline Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 cursor-pointer mb-4" onClick={() => toggleSection("timeline")}>
              {expandedSections.includes("timeline") ? (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              )}
              <h2 className="text-xl font-semibold text-gray-900">📅 Launch Timeline</h2>
            </div>

            {expandedSections.includes("timeline") && (
              <div className="space-y-4 ml-7">
                <div className="border-l-2 border-blue-200 pl-4 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="font-medium text-gray-900">Week 1-2: Pre-Launch</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Finalize features, conduct testing, prepare marketing materials
                  </p>
                </div>

                <div className="border-l-2 border-green-200 pl-4 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="font-medium text-gray-900">Week 3: Soft Launch</span>
                  </div>
                  <p className="text-gray-600 text-sm">Limited release to beta users, gather feedback</p>
                </div>

                <div className="border-l-2 border-purple-200 pl-4 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    <span className="font-medium text-gray-900">Week 4: Full Launch</span>
                  </div>
                  <p className="text-gray-600 text-sm">Public release, marketing campaign activation</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Items Checklist */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">✅ Action Items</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <Checkbox
                  id="task1"
                  checked={checkedItems.includes("task1")}
                  onCheckedChange={() => toggleCheckItem("task1")}
                />
                <label
                  htmlFor="task1"
                  className={`flex-1 cursor-pointer ${checkedItems.includes("task1") ? "line-through text-gray-500" : "text-gray-700"}`}
                >
                  Complete final product testing and QA review
                </label>
                <span className="text-sm text-gray-500">Due: Mar 15</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <Checkbox
                  id="task2"
                  checked={checkedItems.includes("task2")}
                  onCheckedChange={() => toggleCheckItem("task2")}
                />
                <label
                  htmlFor="task2"
                  className={`flex-1 cursor-pointer ${checkedItems.includes("task2") ? "line-through text-gray-500" : "text-gray-700"}`}
                >
                  Prepare marketing campaign materials and assets
                </label>
                <span className="text-sm text-gray-500">Due: Mar 18</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <Checkbox
                  id="task3"
                  checked={checkedItems.includes("task3")}
                  onCheckedChange={() => toggleCheckItem("task3")}
                />
                <label
                  htmlFor="task3"
                  className={`flex-1 cursor-pointer ${checkedItems.includes("task3") ? "line-through text-gray-500" : "text-gray-700"}`}
                >
                  Set up analytics and tracking systems
                </label>
                <span className="text-sm text-gray-500">Due: Mar 20</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <Checkbox
                  id="task4"
                  checked={checkedItems.includes("task4")}
                  onCheckedChange={() => toggleCheckItem("task4")}
                />
                <label
                  htmlFor="task4"
                  className={`flex-1 cursor-pointer ${checkedItems.includes("task4") ? "line-through text-gray-500" : "text-gray-700"}`}
                >
                  Coordinate with customer support team for launch
                </label>
                <span className="text-sm text-gray-500">Due: Mar 22</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="mt-4 gap-2 bg-transparent">
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          </CardContent>
        </Card>

        {/* Success Metrics */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Success Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">User Engagement</h4>
                <p className="text-sm text-blue-700">Daily active users, session duration, feature adoption rate</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Revenue Impact</h4>
                <p className="text-sm text-green-700">New subscriptions, upgrade conversions, revenue growth</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2">Market Response</h4>
                <p className="text-sm text-purple-700">Press coverage, social media mentions, competitor analysis</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-2">Customer Satisfaction</h4>
                <p className="text-sm text-orange-700">NPS score, support tickets, user feedback ratings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

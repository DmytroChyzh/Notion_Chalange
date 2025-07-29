"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Filter,
  SortAsc,
  MoreHorizontal,
  Sparkles,
  BarChart3,
  Link,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"

export function AITableGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [tableData, setTableData] = useState([
    {
      id: 1,
      title: "Q1 Marketing Campaign",
      status: "In Progress",
      owner: "Sarah Chen",
      dueDate: "2024-03-15",
      priority: "High",
    },
    {
      id: 2,
      title: "Website Redesign",
      status: "Planning",
      owner: "Mike Johnson",
      dueDate: "2024-04-01",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Product Launch Event",
      status: "Completed",
      owner: "Emily Davis",
      dueDate: "2024-02-28",
      priority: "High",
    },
    {
      id: 4,
      title: "Customer Survey Analysis",
      status: "Not Started",
      owner: "Alex Kim",
      dueDate: "2024-03-30",
      priority: "Low",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case "In Progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "Planning":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleGenerateData = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const newData = [
        ...tableData,
        {
          id: tableData.length + 1,
          title: "AI Content Strategy",
          status: "Planning",
          owner: "AI Assistant",
          dueDate: "2024-04-15",
          priority: "Medium",
        },
        {
          id: tableData.length + 2,
          title: "User Experience Audit",
          status: "Not Started",
          owner: "Design Team",
          dueDate: "2024-05-01",
          priority: "High",
        },
      ]
      setTableData(newData)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="p-8 w-full max-w-none">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Database</h1>
        <p className="text-gray-600">AI-generated project tracking table with smart columns and data</p>
      </div>

      <div className="flex items-center justify-between mb-6 w-full">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <SortAsc className="w-4 h-4" />
            Sort
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <BarChart3 className="w-4 h-4" />
            Visualize Data
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateData}
            disabled={isGenerating}
            className="gap-2 bg-transparent"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? "Generating..." : "Fill Sample Data"}
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add AI Column
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900">
                  <div className="flex items-center gap-2">
                    <span>Title</span>
                    <SortAsc className="w-4 h-4 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-900">Status</TableHead>
                <TableHead className="font-semibold text-gray-900">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Owner
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Due Date
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-900">Priority</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link className="w-4 h-4 text-blue-600 cursor-pointer hover:text-blue-800" />
                      <span className="font-medium text-gray-900">{row.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(row.status)}
                      <Badge variant="secondary" className={getStatusColor(row.status)}>
                        {row.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">
                          {row.owner
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-gray-700">{row.owner}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">{row.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getPriorityColor(row.priority)}>
                      {row.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{tableData.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {tableData.filter((item) => item.status === "Completed").length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {tableData.filter((item) => item.status === "In Progress").length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

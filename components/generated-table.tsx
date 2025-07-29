"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, Clock, AlertCircle, User, Calendar } from "lucide-react"

export function GeneratedTable() {
  const tableData = [
    {
      id: 1,
      title: "Create landing",
      status: "In Progress",
      owner: "Alice",
      dueDate: "2024-03-15",
      priority: "High",
    },
    {
      id: 2,
      title: "Write blog",
      status: "Pending",
      owner: "Bob",
      dueDate: "2024-04-01",
      priority: "Medium",
    },
    {
      id: 3,
      title: "QA test",
      status: "Done",
      owner: "Emma",
      dueDate: "2024-02-28",
      priority: "Low",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Done":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case "In Progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "Pending":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
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

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">✨ AI Generated Project Table</CardTitle>
        <p className="text-sm text-gray-600">Smart database with automated columns and sample data</p>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="font-medium text-gray-700 px-6 py-3">Title</TableHead>
              <TableHead className="font-medium text-gray-700 px-6 py-3">Status</TableHead>
              <TableHead className="font-medium text-gray-700 px-6 py-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Owner
                </div>
              </TableHead>
              <TableHead className="font-medium text-gray-700 px-6 py-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Due Date
                </div>
              </TableHead>
              <TableHead className="font-medium text-gray-700 px-6 py-3">Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50 border-b border-gray-100">
                <TableCell className="px-6 py-4">
                  <span className="font-medium text-gray-900">{row.title}</span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(row.status)}
                    <Badge variant="secondary" className={getStatusColor(row.status)}>
                      {row.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
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
                <TableCell className="px-6 py-4 text-gray-700">{row.dueDate}</TableCell>
                <TableCell className="px-6 py-4">
                  <Badge variant="secondary" className={getPriorityColor(row.priority)}>
                    {row.priority}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

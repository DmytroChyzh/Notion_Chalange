"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useAI } from "@/hooks/use-ai"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  Plus,
  FileText,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit,
  Trash2,
  User,
  MessageSquare,
  Sparkles,
  Target,
  ArrowRight,
  Tag,
} from "lucide-react"

interface MeetingNote {
  id: number
  title: string
  date: string
  attendees: string[]
  agenda: string[]
  notes: string
  actionItems: ActionItem[]
  tags: string[]
  status: string
}

interface ActionItem {
  id: number
  task: string
  assignee: string
  dueDate: string
  status: string
}

export function MeetingNotes() {
  const [meetingNotes, setMeetingNotes] = useState<MeetingNote[]>([
    {
      id: 1,
      title: "Q1 Planning Meeting",
      date: "2024-03-15",
      attendees: ["Sarah Chen", "Mike Johnson", "Emily Davis", "Alex Kim"],
      agenda: [
        "Review Q4 performance",
        "Plan Q1 objectives",
        "Discuss resource allocation",
        "Set team goals"
      ],
      notes: "Team discussed Q4 achievements and planned Q1 objectives. Key focus areas include product development, marketing campaigns, and team expansion. Budget approved for new hires.",
      actionItems: [
        {
          id: 1,
          task: "Create Q1 project timeline",
          assignee: "Sarah Chen",
          dueDate: "2024-03-20",
          status: "In Progress"
        },
        {
          id: 2,
          task: "Hire 2 new developers",
          assignee: "Mike Johnson",
          dueDate: "2024-04-01",
          status: "Not Started"
        },
        {
          id: 3,
          task: "Plan marketing campaign",
          assignee: "Emily Davis",
          dueDate: "2024-03-25",
          status: "Completed"
        }
      ],
      tags: ["planning", "Q1", "strategy"],
      status: "Completed"
    },
    {
      id: 2,
      title: "Product Development Sync",
      date: "2024-03-18",
      attendees: ["Mike Johnson", "Alex Kim", "Sarah Chen"],
      agenda: [
        "Review current sprint progress",
        "Discuss technical challenges",
        "Plan next sprint",
        "Address bug reports"
      ],
      notes: "Sprint is on track with 80% completion. Technical challenges with API integration identified. Next sprint will focus on user authentication and payment processing.",
      actionItems: [
        {
          id: 4,
          task: "Fix API integration issues",
          assignee: "Alex Kim",
          dueDate: "2024-03-25",
          status: "In Progress"
        },
        {
          id: 5,
          task: "Plan user authentication features",
          assignee: "Mike Johnson",
          dueDate: "2024-04-05",
          status: "Not Started"
        }
      ],
      tags: ["development", "sprint", "technical"],
      status: "In Progress"
    }
  ])

  const [isAddingMeeting, setIsAddingMeeting] = useState(false)
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    date: "",
    attendees: "",
    agenda: "",
    notes: "",
    tags: ""
  })

  const { toast } = useToast()
  const { generateContent, isLoading } = useAI()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Not Started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-4 h-4" />
      case "In Progress":
        return <Clock className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const handleAddMeeting = () => {
    if (!newMeeting.title || !newMeeting.date) {
      toast({
        title: "Missing information",
        description: "Please fill in meeting title and date.",
        variant: "destructive",
      })
      return
    }

    const meeting: MeetingNote = {
      id: meetingNotes.length + 1,
      title: newMeeting.title,
      date: newMeeting.date,
      attendees: newMeeting.attendees.split(',').map(a => a.trim()).filter(a => a !== ""),
      agenda: newMeeting.agenda.split('\n').map(a => a.trim()).filter(a => a !== ""),
      notes: newMeeting.notes,
      actionItems: [],
      tags: newMeeting.tags.split(',').map(t => t.trim()).filter(t => t !== ""),
      status: "Completed"
    }

    setMeetingNotes([...meetingNotes, meeting])
    setNewMeeting({
      title: "",
      date: "",
      attendees: "",
      agenda: "",
      notes: "",
      tags: ""
    })
    setIsAddingMeeting(false)

    toast({
      title: "Meeting added",
      description: "New meeting notes have been created.",
    })
  }

  const handleDeleteMeeting = (id: number) => {
    setMeetingNotes(meetingNotes.filter(m => m.id !== id))
    toast({
      title: "Meeting deleted",
      description: "Meeting notes have been removed.",
    })
  }

  const handleGenerateNotes = async () => {
    try {
      const result = await generateContent(
        "Generate meeting notes for a team planning session with agenda items, action items, and key discussion points",
        "text"
      )
      
      const aiMeeting: MeetingNote = {
        id: meetingNotes.length + 1,
        title: "AI Generated Meeting",
        date: new Date().toISOString().split('T')[0],
        attendees: ["AI Assistant", "Team Lead"],
        agenda: ["AI generated agenda item 1", "AI generated agenda item 2"],
        notes: result?.content || "AI generated meeting notes",
        actionItems: [
          {
            id: Date.now(),
            task: "AI Generated Task",
            assignee: "AI Assistant",
            dueDate: "2024-04-15",
            status: "Not Started"
          }
        ],
        tags: ["ai-generated", "meeting"],
        status: "Completed"
      }

      setMeetingNotes([...meetingNotes, aiMeeting])
      toast({
        title: "AI Notes Generated",
        description: "New meeting notes have been created using AI.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate notes with AI.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-8 w-full max-w-none">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meeting Notes</h1>
          <p className="text-gray-600">Capture and organize your meeting discussions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleGenerateNotes} disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner type="inline" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate with AI
              </>
            )}
          </Button>
          <Dialog open={isAddingMeeting} onOpenChange={setIsAddingMeeting}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Meeting
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Meeting</DialogTitle>
                <DialogDescription>
                  Create new meeting notes with agenda and action items
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Meeting Title</label>
                    <Input
                      value={newMeeting.title}
                      onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                      placeholder="Enter meeting title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <Input
                      type="date"
                      value={newMeeting.date}
                      onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Attendees (comma-separated)</label>
                  <Input
                    value={newMeeting.attendees}
                    onChange={(e) => setNewMeeting({...newMeeting, attendees: e.target.value})}
                    placeholder="e.g., John Doe, Jane Smith"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Agenda (one per line)</label>
                  <Textarea
                    value={newMeeting.agenda}
                    onChange={(e) => setNewMeeting({...newMeeting, agenda: e.target.value})}
                    placeholder="Enter agenda items, one per line"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Meeting Notes</label>
                  <Textarea
                    value={newMeeting.notes}
                    onChange={(e) => setNewMeeting({...newMeeting, notes: e.target.value})}
                    placeholder="Enter meeting notes and key discussion points"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tags (comma-separated)</label>
                  <Input
                    value={newMeeting.tags}
                    onChange={(e) => setNewMeeting({...newMeeting, tags: e.target.value})}
                    placeholder="e.g., planning, strategy, Q1"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddingMeeting(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMeeting}>
                    Add Meeting
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-6 w-full">
        {meetingNotes.map((meeting) => (
          <Card key={meeting.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {meeting.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{meeting.attendees.length} attendees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{meeting.actionItems.length} action items</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteMeeting(meeting.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Agenda */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Agenda
                  </h4>
                  <div className="space-y-2">
                    {meeting.agenda.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="font-medium mb-3">Notes</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{meeting.notes}</p>
                </div>
              </div>

              {/* Action Items */}
              {meeting.actionItems.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Action Items
                  </h4>
                  <div className="space-y-3">
                    {meeting.actionItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{item.task}</span>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{item.assignee}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{item.dueDate}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusIcon(item.status)}
                          <span className="ml-1">{item.status}</span>
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {meeting.tags.length > 0 && (
                <div className="mt-4 flex gap-2">
                  {meeting.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 
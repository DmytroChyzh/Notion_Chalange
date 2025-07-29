"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useAI } from "@/hooks/use-ai"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  Plus,
  Calendar,
  FileText,
  Image,
  Video,
  Link,
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  Eye,
  Share2,
  TrendingUp,
  BarChart3,
  Sparkles,
} from "lucide-react"

interface ContentItem {
  id: number
  title: string
  type: string
  status: string
  author: string
  publishDate: string
  platform: string
  description: string
  tags: string[]
}

export function ContentCalendar() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: 1,
      title: "Q1 Product Launch Blog Post",
      type: "Blog Post",
      status: "Published",
      author: "Sarah Chen",
      publishDate: "2024-03-15",
      platform: "Company Blog",
      description: "Comprehensive blog post about our Q1 product launch",
      tags: ["product", "launch", "Q1"]
    },
    {
      id: 2,
      title: "Social Media Campaign Video",
      type: "Video",
      status: "In Progress",
      author: "Mike Johnson",
      publishDate: "2024-03-20",
      platform: "Instagram, TikTok",
      description: "Short-form video for social media campaign",
      tags: ["video", "social", "campaign"]
    },
    {
      id: 3,
      title: "Email Newsletter - March",
      type: "Email",
      status: "Scheduled",
      author: "Emily Davis",
      publishDate: "2024-03-25",
      platform: "Email Marketing",
      description: "Monthly newsletter with company updates",
      tags: ["email", "newsletter", "monthly"]
    },
    {
      id: 4,
      title: "Infographic: Industry Trends",
      type: "Infographic",
      status: "Draft",
      author: "Alex Kim",
      publishDate: "2024-04-01",
      platform: "LinkedIn, Twitter",
      description: "Visual representation of industry trends",
      tags: ["infographic", "trends", "visual"]
    },
  ])

  const [isAddingContent, setIsAddingContent] = useState(false)
  const [newContent, setNewContent] = useState({
    title: "",
    type: "Blog Post",
    author: "",
    publishDate: "",
    platform: "",
    description: "",
    tags: ""
  })

  const { toast } = useToast()
  const { generateContent, isLoading } = useAI()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Blog Post":
        return <FileText className="w-4 h-4" />
      case "Video":
        return <Video className="w-4 h-4" />
      case "Email":
        return <Mail className="w-4 h-4" />
      case "Infographic":
        return <Image className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddContent = () => {
    if (!newContent.title || !newContent.author || !newContent.publishDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const contentItem: ContentItem = {
      id: contentItems.length + 1,
      title: newContent.title,
      type: newContent.type,
      status: "Draft",
      author: newContent.author,
      publishDate: newContent.publishDate,
      platform: newContent.platform,
      description: newContent.description,
      tags: newContent.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "")
    }

    setContentItems([...contentItems, contentItem])
    setNewContent({
      title: "",
      type: "Blog Post",
      author: "",
      publishDate: "",
      platform: "",
      description: "",
      tags: ""
    })
    setIsAddingContent(false)

    toast({
      title: "Content added",
      description: "New content has been added to the calendar.",
    })
  }

  const handleDeleteContent = (id: number) => {
    setContentItems(contentItems.filter(item => item.id !== id))
    toast({
      title: "Content deleted",
      description: "Content has been removed from the calendar.",
    })
  }

  const handleGenerateCalendar = async () => {
    try {
      const result = await generateContent(
        "Generate a content calendar for the next 3 months with blog posts, social media content, and email newsletters",
        "table"
      )
      
      const aiContent: ContentItem = {
        id: contentItems.length + 1,
        title: "AI Generated Content",
        type: "Blog Post",
        status: "Draft",
        author: "AI Assistant",
        publishDate: "2024-04-15",
        platform: "Company Blog",
        description: result?.content || "AI generated content description",
        tags: ["ai-generated", "content"]
      }

      setContentItems([...contentItems, aiContent])
      toast({
        title: "AI Calendar Generated",
        description: "New content has been added using AI.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate calendar with AI.",
        variant: "destructive",
      })
    }
  }

  const totalContent = contentItems.length
  const publishedContent = contentItems.filter(item => item.status === "Published").length
  const scheduledContent = contentItems.filter(item => item.status === "Scheduled").length

  return (
    <div className="p-8 w-full max-w-none">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Calendar</h1>
          <p className="text-gray-600">Plan and schedule your content across all platforms</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleGenerateCalendar} disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner type="inline" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate with AI
              </>
            )}
          </Button>
          <Dialog open={isAddingContent} onOpenChange={setIsAddingContent}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Content
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Content</DialogTitle>
                <DialogDescription>
                  Schedule new content for your calendar
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Content Title</label>
                  <Input
                    value={newContent.title}
                    onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                    placeholder="Enter content title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Content Type</label>
                    <select
                      value={newContent.type}
                      onChange={(e) => setNewContent({...newContent, type: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Blog Post">Blog Post</option>
                      <option value="Video">Video</option>
                      <option value="Email">Email</option>
                      <option value="Infographic">Infographic</option>
                      <option value="Social Post">Social Post</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Author</label>
                    <Input
                      value={newContent.author}
                      onChange={(e) => setNewContent({...newContent, author: e.target.value})}
                      placeholder="Enter author name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Publish Date</label>
                    <Input
                      type="date"
                      value={newContent.publishDate}
                      onChange={(e) => setNewContent({...newContent, publishDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Platform</label>
                    <Input
                      value={newContent.platform}
                      onChange={(e) => setNewContent({...newContent, platform: e.target.value})}
                      placeholder="e.g., Company Blog, Instagram"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={newContent.description}
                    onChange={(e) => setNewContent({...newContent, description: e.target.value})}
                    placeholder="Enter content description"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tags (comma-separated)</label>
                  <Input
                    value={newContent.tags}
                    onChange={(e) => setNewContent({...newContent, tags: e.target.value})}
                    placeholder="e.g., product, launch, Q1"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddingContent(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddContent}>
                    Add Content
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalContent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{publishedContent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{scheduledContent}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Content Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Publish Date</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                        <div className="flex gap-1 mt-1">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <span>{item.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {item.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {item.author}
                      </div>
                    </TableCell>
                    <TableCell>{item.publishDate}</TableCell>
                    <TableCell>{item.platform}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteContent(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Content Analytics */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Content Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Blog Posts</p>
                  <p className="text-xl font-bold">{contentItems.filter(item => item.type === "Blog Post").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Video className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Videos</p>
                  <p className="text-xl font-bold">{contentItems.filter(item => item.type === "Video").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Emails</p>
                  <p className="text-xl font-bold">{contentItems.filter(item => item.type === "Email").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Image className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Infographics</p>
                  <p className="text-xl font-bold">{contentItems.filter(item => item.type === "Infographic").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Missing Mail icon import
import { Mail } from "lucide-react" 
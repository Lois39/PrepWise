
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Send, 
  ThumbsUp, 
  Filter 
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface ForumPost {
  id: string;
  author: string;
  authorId: string;
  avatar: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: Comment[];
  timestamp: Date;
  liked: boolean;
}

interface Comment {
  id: string;
  author: string;
  authorId: string;
  avatar: string;
  content: string;
  timestamp: Date;
}

const SAMPLE_POSTS: ForumPost[] = [
  {
    id: "1",
    author: "Jessica Chen",
    authorId: "user1",
    avatar: "",
    title: "How to answer 'Tell me about yourself' effectively",
    content: "I've been struggling with this common question. I never know how much personal vs professional information to include. Any tips from successful interviews?",
    category: "Interview Tips",
    likes: 24,
    comments: [
      {
        id: "c1",
        author: "Michael Smith",
        authorId: "user2",
        avatar: "",
        content: "I always structure it as: 1) Brief professional background 2) Key achievement 3) Why I'm excited about this role. Keep it under 2 minutes!",
        timestamp: new Date(Date.now() - 86400000)
      }
    ],
    timestamp: new Date(Date.now() - 172800000),
    liked: false
  },
  {
    id: "2",
    author: "Robert Johnson",
    authorId: "user3",
    avatar: "",
    title: "Technical interview preparation for software engineering roles",
    content: "Just completed 5 technical interviews for FAANG companies. Happy to share my preparation strategy and experience. What specific areas are you struggling with?",
    category: "Technical Interviews",
    likes: 47,
    comments: [
      {
        id: "c2",
        author: "Emma Watson",
        authorId: "user4",
        avatar: "",
        content: "Did you focus more on algorithms or system design? I have a Google interview next week and I'm not sure where to put my energy.",
        timestamp: new Date(Date.now() - 48000000)
      },
      {
        id: "c3",
        author: "Robert Johnson",
        authorId: "user3",
        avatar: "",
        content: "For Google, definitely prepare for both! Their process usually has distinct rounds for algorithms and system design. Make sure you can explain your thought process clearly.",
        timestamp: new Date(Date.now() - 24000000)
      }
    ],
    timestamp: new Date(Date.now() - 345600000),
    liked: false
  }
];

const CommunityForum = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General");
  const [currentCategory, setCurrentCategory] = useState<string>("All");
  const [commentContent, setCommentContent] = useState<{[key: string]: string}>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activePost, setActivePost] = useState<ForumPost | null>(null);
  const { toast } = useToast();
  
  const categories = [
    "All",
    "General",
    "Interview Tips",
    "Technical Interviews", 
    "Behavioral Questions",
    "Salary Negotiation",
    "Job Search",
    "Resume Tips"
  ];
  
  // Load saved posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("forumPosts");
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts).map((post: any) => ({
          ...post,
          timestamp: new Date(post.timestamp),
          comments: post.comments.map((comment: any) => ({
            ...comment,
            timestamp: new Date(comment.timestamp)
          }))
        }));
        setPosts(parsedPosts);
      } catch (error) {
        console.error("Error parsing saved posts:", error);
        // If there's an error, use sample posts
        setPosts(SAMPLE_POSTS);
      }
    } else {
      // If no saved posts, use sample posts
      setPosts(SAMPLE_POSTS);
    }
  }, []);
  
  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("forumPosts", JSON.stringify(posts));
    }
  }, [posts]);
  
  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }
    
    const newPost: ForumPost = {
      id: Date.now().toString(),
      author: "Current User", // In a real app, get from auth context
      authorId: "currentUser", // In a real app, get from auth context
      avatar: "",
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      likes: 0,
      comments: [],
      timestamp: new Date(),
      liked: false
    };
    
    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    
    toast({
      title: "Post Created",
      description: "Your post has been published to the community",
    });
  };
  
  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };
  
  const handleAddComment = (postId: string) => {
    if (!commentContent[postId] || !commentContent[postId].trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Date.now().toString(),
          author: "Current User", // In a real app, get from auth context
          authorId: "currentUser", // In a real app, get from auth context
          avatar: "",
          content: commentContent[postId],
          timestamp: new Date()
        };
        
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
    
    // Clear the comment input
    setCommentContent({
      ...commentContent,
      [postId]: ""
    });
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted",
    });
  };
  
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
  };
  
  const filteredPosts = posts.filter(post => {
    const matchesCategory = currentCategory === "All" || post.category === currentCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full animate-fade-in">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Users className="h-6 w-6 text-interview-primary" />
            Community Forum
          </CardTitle>
          <CardDescription>
            Share experiences, ask questions, and learn from others
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            {/* Create New Post Section */}
            <div className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-interview-primary hover:bg-interview-secondary transition-colors">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Create New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create a Post</DialogTitle>
                    <DialogDescription>
                      Share your experiences or ask questions to the community
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Select value={newPostCategory} onValueChange={setNewPostCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(cat => cat !== "All").map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Post title"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Write your post content here..."
                        className="min-h-[150px]"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreatePost}>Post to Community</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={currentCategory} onValueChange={setCurrentCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Posts List */}
            <div className="space-y-6">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-10">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium">No posts found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? "Try a different search term or category filter" 
                      : "Be the first to start a discussion!"}
                  </p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <Card key={post.id} className="hover-lift transition-all duration-300 overflow-hidden animate-slide-in-up">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={post.avatar} />
                            <AvatarFallback>
                              {post.author.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{post.title}</CardTitle>
                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                              <span>{post.author}</span>
                              <span>•</span>
                              <span>{formatTimeAgo(post.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="line-clamp-2">{post.content}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-3 pt-0">
                      <div className="flex items-center w-full justify-between">
                        <div className="flex items-center gap-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-1 ${post.liked ? 'text-interview-primary' : ''}`}
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => setActivePost(post)}
                              >
                                <MessageSquare className="h-4 w-4" />
                                <span>{post.comments.length}</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <Badge variant="outline">{activePost?.category}</Badge>
                                  {activePost?.title}
                                </DialogTitle>
                                <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
                                  <Avatar className="h-6 w-6 mr-1">
                                    <AvatarFallback>
                                      {activePost?.author.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{activePost?.author}</span>
                                  <span>•</span>
                                  <span>{activePost && formatTimeAgo(activePost.timestamp)}</span>
                                </div>
                              </DialogHeader>
                              <div className="py-4">
                                <p className="mb-6">{activePost?.content}</p>
                                
                                <div className="mt-6 space-y-4">
                                  <h4 className="font-medium">Comments ({activePost?.comments.length})</h4>
                                  
                                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
                                    {activePost?.comments.map((comment) => (
                                      <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg animate-fade-in">
                                        <Avatar className="h-8 w-8">
                                          <AvatarFallback>
                                            {comment.author.substring(0, 2).toUpperCase()}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium text-sm">{comment.author}</span>
                                            <span className="text-xs text-muted-foreground">
                                              {formatTimeAgo(comment.timestamp)}
                                            </span>
                                          </div>
                                          <p className="text-sm mt-1">{comment.content}</p>
                                        </div>
                                      </div>
                                    ))}
                                    
                                    {activePost?.comments.length === 0 && (
                                      <p className="text-center text-muted-foreground text-sm py-4">
                                        No comments yet. Be the first to comment!
                                      </p>
                                    )}
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="Add a comment..."
                                      value={commentContent[activePost?.id || ''] || ''}
                                      onChange={(e) => setCommentContent({
                                        ...commentContent,
                                        [activePost?.id || '']: e.target.value
                                      })}
                                    />
                                    <Button 
                                      onClick={() => activePost && handleAddComment(activePost.id)}
                                      size="sm"
                                    >
                                      <Send className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityForum;

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, MessageCircle, Heart, Share, Trophy, Star, Flame, Code, Download, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import type { App } from "@shared/schema";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("trending");

  const { data: apps = [] } = useQuery<App[]>({
    queryKey: ["/api/apps"],
  });

  // Mock community data
  const communityStats = {
    totalUsers: "250K+",
    appsShared: "15K+",
    reviews: "50K+",
    developers: "1.2K+"
  };

  const trendingPosts = [
    {
      id: 1,
      user: { name: "TechMaster92", avatar: "TM", level: "Pro Developer" },
      content: "¡Acabo de lanzar una versión mod increíble de Spotify con funciones premium desbloqueadas! 🎵",
      app: "Spotify Premium Mod",
      likes: 234,
      comments: 45,
      shares: 12,
      timestamp: "hace 2 horas"
    },
    {
      id: 2,
      user: { name: "AppHunter", avatar: "AH", level: "Beta Tester" },
      content: "Comparativa completa: WhatsApp Plus vs WhatsApp Business Mod. ¿Cuál prefieres? 📱",
      app: "WhatsApp Mods",
      likes: 189,
      comments: 67,
      shares: 23,
      timestamp: "hace 4 horas"
    },
    {
      id: 3,
      user: { name: "ModQueen", avatar: "MQ", level: "Community Leader" },
      content: "Tutorial: Cómo instalar apps mod de forma segura sin perder datos. Guía paso a paso 🛡️",
      app: "Guía de Seguridad",
      likes: 445,
      comments: 89,
      shares: 156,
      timestamp: "hace 6 horas"
    }
  ];

  const topDevelopers = [
    { name: "NexusDev", apps: 45, rating: 4.9, specialty: "Gaming Mods", avatar: "ND" },
    { name: "ModCrafters", apps: 38, rating: 4.8, specialty: "Social Apps", avatar: "MC" },
    { name: "PremiumTeam", apps: 52, rating: 4.7, specialty: "Productivity", avatar: "PT" },
    { name: "EliteCoders", apps: 29, rating: 4.9, specialty: "Media Players", avatar: "EC" },
  ];

  const recentReviews = [
    {
      user: "GameLover23",
      app: "PUBG Mobile Mod",
      rating: 5,
      comment: "¡Increíble! Todas las skins desbloqueadas y sin lag. Perfecto para competir.",
      timestamp: "hace 1 hora"
    },
    {
      user: "PhotoPro",
      app: "Lightroom Premium",
      rating: 5,
      comment: "Todas las funciones premium funcionando perfectamente. Excelente calidad.",
      timestamp: "hace 3 horas"
    },
    {
      user: "MusicFan",
      app: "YouTube Music Vanced",
      rating: 4,
      comment: "Muy buena app, pero a veces se cierra. En general, muy recomendable.",
      timestamp: "hace 5 horas"
    }
  ];

  const PostCard = ({ post }: { post: any }) => (
    <Card className="bg-black/40 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                {post.user.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{post.user.name}</span>
                <Badge variant="outline" className="border-purple-500/30 text-purple-300 text-xs">
                  {post.user.level}
                </Badge>
              </div>
              <span className="text-gray-400 text-sm">{post.timestamp}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-3">{post.content}</p>
        <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 mb-4">
          {post.app}
        </Badge>
        <div className="flex items-center justify-between pt-3 border-t border-purple-500/20">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400">
              <Heart className="h-4 w-4 mr-1" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400">
              <MessageCircle className="h-4 w-4 mr-1" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400">
              <Share className="h-4 w-4 mr-1" />
              {post.shares}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Comunidad Nexus
          </motion.h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Conecta con desarrolladores, comparte experiencias y descubre las mejores apps mod de la comunidad
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black/40 border-purple-500/20 text-center">
            <CardContent className="p-4">
              <Users className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{communityStats.totalUsers}</div>
              <div className="text-sm text-gray-400">Usuarios Activos</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-purple-500/20 text-center">
            <CardContent className="p-4">
              <Download className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{communityStats.appsShared}</div>
              <div className="text-sm text-gray-400">Apps Compartidas</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-purple-500/20 text-center">
            <CardContent className="p-4">
              <Star className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold text-white">{communityStats.reviews}</div>
              <div className="text-sm text-gray-400">Reseñas</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-purple-500/20 text-center">
            <CardContent className="p-4">
              <Code className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{communityStats.developers}</div>
              <div className="text-sm text-gray-400">Desarrolladores</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-purple-500/30">
                <TabsTrigger value="trending" className="data-[state=active]:bg-purple-600/30">
                  <Flame className="h-4 w-4 mr-2" />
                  Tendencias
                </TabsTrigger>
                <TabsTrigger value="latest" className="data-[state=active]:bg-purple-600/30">
                  Recientes
                </TabsTrigger>
                <TabsTrigger value="top" className="data-[state=active]:bg-purple-600/30">
                  <Trophy className="h-4 w-4 mr-2" />
                  Top
                </TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="space-y-6 mt-6">
                {trendingPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: post.id * 0.1 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="latest" className="space-y-6 mt-6">
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400">Los posts más recientes aparecerán aquí</p>
                </div>
              </TabsContent>

              <TabsContent value="top" className="space-y-6 mt-6">
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                  <p className="text-gray-400">Los posts más populares de la semana</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Developers */}
            <Card className="bg-black/40 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Top Desarrolladores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDevelopers.map((dev, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs">
                            {dev.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white text-sm">{dev.name}</div>
                          <div className="text-xs text-gray-400">{dev.specialty}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-white">{dev.apps} apps</div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-400">{dev.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card className="bg-black/40 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Star className="h-5 w-5 text-yellow-400" />
                  Reseñas Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-4">
                    {recentReviews.map((review, index) => (
                      <div key={index} className="border-b border-purple-500/20 pb-3 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-white text-sm">{review.user}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-300 mb-2">{review.comment}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="border-purple-500/30 text-purple-300 text-xs">
                            {review.app}
                          </Badge>
                          <span className="text-xs text-gray-400">{review.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
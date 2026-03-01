"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"

interface EventCardProps {
    title: string
    description: string
    imageUrl: string
    isPermanent?: boolean
    date?: string
    location?: string
    category: "arte-vida" | "arte-siembra" | "actividad"
}

export default function EventsCard({
    title,
    description,
    imageUrl,
    isPermanent = false,
    date,
    location,
    category,
}: EventCardProps) {
    const categoryColors = {
        "arte-vida": "bg-accent text-accent-foreground",
        "arte-siembra": "bg-primary text-primary-foreground",
        "actividad": "bg-secondary text-secondary-foreground",
    }

    const categoryLabels = {
        "arte-vida": "Arte y Vida",
        "arte-siembra": "Arte y Siembra",
        "actividad": "Actividad",
    }

    return (
        <Card className="group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                    <Badge className={categoryColors[category]}>
                        {categoryLabels[category]}
                    </Badge>
                    {isPermanent && (
                        <Badge variant="outline" className="border-card/50 bg-card/80 text-card-foreground">
                            Programa Permanente
                        </Badge>
                    )}
                </div>
            </div>
            <CardHeader className="pb-2">
                <h3 className="text-xl font-semibold text-foreground text-balance">{title}</h3>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed line-clamp-3">{description}</p>
                {(date || location) && (
                    <div className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground">
                        {date && (
                            <div className="flex items-center gap-1.5">
                                <CalendarDays className="h-4 w-4" />
                                <span>{date}</span>
                            </div>
                        )}
                        {location && (
                            <div className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                <span>{location}</span>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

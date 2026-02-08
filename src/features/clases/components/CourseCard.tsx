
import { Course } from "@/types/course";
import { Button } from "@/components/Button";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

interface CourseCardProps {
    course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center bg-zinc-900/50 rounded-2xl border border-white/5 p-6 hover:border-primary/30 transition-all group">
            <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden relative">
                {course.image ? (
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <ImagePlaceholder
                        className="w-full h-full bg-zinc-800/50 group-hover:scale-105 transition-transform duration-700"
                        type="image"
                        text={course.instrument}
                    />
                )}
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        {course.level}
                    </span>
                    <span className="text-zinc-500 text-sm">{course.instrument}</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-white mb-3">
                    {course.title}
                </h3>

                <p className="text-zinc-400 mb-6">
                    {course.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-6">
                    {course.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                        </div>
                    ))}
                </div>

                <Button
                    as={Link}
                    href={getWhatsAppLink(WHATSAPP_MESSAGES.academy)}
                    target="_blank"
                    variant="outline"
                    className="gap-2 hover:bg-primary hover:text-black hover:border-primary transition-all w-full sm:w-auto justify-center group/btn"
                >
                    Inscribirme Ahora
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>

            </div>
        </div>
    );
}

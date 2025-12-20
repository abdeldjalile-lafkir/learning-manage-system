import Image from "next/image";
import { isArabic } from "@/utils";
import { cn } from "@/lib/cn";

const roles = [
  {
    id: 1,
    en: "Primary School Professor",
    ar: "أستاذ المدرسة الابتدائية",
  },
  {
    id: 2,
    en: "Middle School Professor",
    ar: "أستاذ التعليم المتوسط",
  },
  {
    id: 3,
    en: "Secondary School Professor",
    ar: "أستاذ التعليم الثانوي",
  },
];

const members = [
  {
    name: "عبد الرحمن منصور",
    role: 1,
    avatar: "/avatars/Avatar2.png",
  },
  {
    name: "سعيد الزهراني",
    role: 3,
    avatar: "/avatars/Avatar.jpg",
  },
  {
    name: "Jane Smith",
    role: 2,
    avatar: "/avatars/Avatar.jpg",
  },
  {
    name: "خالد الشريف",
    role: 1,
    avatar: "/avatars/Avatar2.png",
  },
  {
    name: "abdeldjalile lafkir",
    role: 3,
    avatar: "/avatars/Avatar2.png",
  },
  {
    name: "محمد فهد",
    role: 2,
    avatar: "/avatars/Avatar2.png",
  },
  {
    name: "John Doe",
    role: 1,
    avatar: "/avatars/Avatar2.png",
  },
  {
    name: "Some Name",
    role: 3,
    avatar: "/avatars/Avatar.jpg",
  },
];
export default function TeamSection({ text }: { text: string }) {
  return (
    <section>
      <div className="mx-auto w-[80%] py-4 lg:px-0">
        <div>
          <div className="grid grid-cols-2 gap-4 border-t py-6 mx-auto md:grid-cols-8">
            {members.map((member, index) => (
              <div
                key={index}
                className={cn(
                  index > 3
                    ? "hidden md:block px-auto"
                    : "" + "flex flex-col items-center justify-center px-auto"
                )}
              >
                <div className="bg-background mx-auto size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5">
                  <Image
                    className="aspect-square rounded-full object-cover"
                    src={member.avatar}
                    alt={member.name}
                    height={460}
                    width={460}
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block text-sm text-center">
                  {member.name}
                </span>
                <span className="text-muted-foreground block text-xs text-center">
                  {
                    roles.find((role) => role.id === member.role)?.[
                      isArabic(text) ? "ar" : "en"
                    ]
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

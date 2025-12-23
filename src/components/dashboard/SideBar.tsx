"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  HomeIcon,
  LayoutDashboard,
  UserCog,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

import {
  Library,
  ListOrdered,
  Users,
  ClipboardList,
  CalendarCheck,
  CreditCard,
  DollarSign,
  Megaphone,
  BarChart2,
} from "lucide-react";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function SideBar() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("dashboard.sidebar");

  const user = { role: "admin" };

  const { headLinks, adminLinks, teacherLinks, studentsLinks, footLinks } =
    getLinks({
      role: user.role,
      t,
    });

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between">
        <div className="flex flex-col overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-2">
            {open ? <Logo /> : <LogoIcon />}
          </div>

          <>
            <Separator className="my-5" />
            <div className="flex flex-col gap-2">
              {headLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </>

          {user.role === "admin" && (
            <>
              <Separator className="my-5" />
              <div className="flex flex-col gap-2">
                {adminLinks?.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </>
          )}
          {user.role === "teacher" && (
            <>
              <Separator className="my-5" />
              <div className="flex flex-col gap-2">
                {teacherLinks?.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </>
          )}
          {user.role === "student" && (
            <>
              <Separator className="my-5" />
              <div className="flex flex-col gap-2">
                {studentsLinks?.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </>
          )}

          <>
            <Separator className="my-5" />
            <div className="flex flex-col gap-2">
              {footLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </>
        </div>

        <div>
          <Separator className="my-5" />
          <SidebarLink
            link={{
              label: "User Name",
              href: "#",
              icon: (
                <Image
                  src="https://assets.aceternity.com/manu.png"
                  className="h-7 w-7 shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        LMS Platform
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
    </Link>
  );
};

const getLinks = ({
  role,
  t,
}: {
  role: string;
  t: (key: string) => string;
}) => {
  const headLinks = [
    {
      label: t("head.home"),
      href: "/",
      icon: <HomeIcon className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("head.overview"),
      href: "/dashboard/teacher",
      icon: <LayoutDashboard className="text-foreground h-5 w-5 shrink-0" />,
    },
  ];
  const adminLinks = [
    {
      label: t("admin.users"),
      href: "/dashboard/admin/users",
      icon: <Users className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("admin.courses"),
      href: "/dashboard/admin/courses",
      icon: <Library className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("admin.settings"),
      href: "/dashboard/admin/settings",
      icon: <Settings className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("admin.reports"),
      href: "/dashboard/admin/reports",
      icon: <BarChart2 className="text-foreground h-5 w-5 shrink-0" />,
    },
  ];

  const teacherLinks = [
    {
      label: t("teacher.courses"),
      href: "/dashboard/teacher/courses",
      icon: <Library className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("teacher.chapters"),
      href: "/dashboard/teacher/chapters",
      icon: <ListOrdered className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("teacher.groups"),
      href: "/dashboard/teacher/student-groups",
      icon: <Users className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("teacher.assignments"),
      href: "/dashboard/teacher/assignments",
      icon: <ClipboardList className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("teacher.attendance"),
      href: "/dashboard/teacher/attendance",
      icon: <CalendarCheck className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("teacher.subscriptions"),
      href: "/dashboard/teacher/subscriptions",
      icon: <CreditCard className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("teacher.payments"),
      href: "/dashboard/teacher/payments",
      icon: <DollarSign className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("teacher.announcements"),
      href: "/dashboard/teacher/announcements",
      icon: <Megaphone className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("teacher.reports"),
      href: "/dashboard/teacher/reports",
      icon: <BarChart2 className="text-foreground h-5 w-5 shrink-0" />,
    },
  ];

  const studentLinks = [
    {
      label: t("student.courses"),
      href: "/dashboard/student/courses",
      icon: <Library className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("student.assignments"),
      href: "/dashboard/student/assignments",
      icon: <ClipboardList className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("student.attendance"),
      href: "/dashboard/student/attendance",
      icon: <CalendarCheck className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("student.subscriptions"),
      href: "/dashboard/student/subscriptions",
      icon: <CreditCard className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("student.payments"),
      href: "/dashboard/student/payments",
      icon: <DollarSign className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("student.announcements"),
      href: "/dashboard/student/announcements",
      icon: <Megaphone className="text-foreground h-5 w-5 shrink-0" />,
    },
  ];

  const footLinks = [
    {
      label: t("foot.profile"),
      href: "#",
      icon: <UserCog className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("foot.settings"),
      href: "#",
      icon: <Settings className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("foot.help"),
      href: "#",
      icon: <HelpCircle className="text-foreground h-5 w-5 shrink-0" />,
    },
    {
      label: t("foot.logout"),
      href: "#",
      icon: <LogOut className="text-foreground h-5 w-5 shrink-0" />,
    },
  ];

  return {
    headLinks,
    adminLinks: role === "admin" ? adminLinks : [],
    teacherLinks: role === "teacher" ? teacherLinks : [],
    studentsLinks: role === "student" ? studentLinks : [],
    footLinks,
  };
};

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSidebar } from "./ui/sidebar";

const capitalizeWords = (str: string) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const KEYWORDS = ["risk-assessment", "context-of-the-organization"];

export const AppBreadcrumb = () => {
  const [open, setOpen] = useState(false);
  const { isMobile } = useSidebar();
  const location = useLocation();
  const params = useParams();

  const ITEMS_TO_DISPLAY = isMobile ? 1 : 5;

  const pathSegments = location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => ({
      label: segment,
      path: "/" + array.slice(0, index + 1).join("/"),
    }));

  const collapsedSegments = pathSegments.slice(
    0,
    -Math.min(pathSegments.length, ITEMS_TO_DISPLAY)
  );

  const isNonClickable = (segment: string) => {
    return (
      Object.values(params).includes(segment) ||
      KEYWORDS.includes(segment.toLowerCase())
    );
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.length > 0 && <BreadcrumbSeparator />}

        {/* Conditionally display collapsed breadcrumbs */}
        {pathSegments.length > ITEMS_TO_DISPLAY ? (
          <>
            <BreadcrumbItem>
              {!isMobile ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {collapsedSegments.map((segment, index) => {
                      const isNonClickableItem = isNonClickable(segment.label);
                      return (
                        <DropdownMenuItem key={index}>
                          {isNonClickableItem ? (
                            <span className="text-gray-500">
                              {capitalizeWords(segment.label)}
                            </span>
                          ) : (
                            <Link to={segment.path}>
                              {capitalizeWords(segment.label)}
                            </Link>
                          )}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label="Toggle menu">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle className="dark:text-gray-200">
                        Navigate to
                      </DrawerTitle>
                      <DrawerDescription>
                        Select a page to navigate to.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {collapsedSegments.map((segment, index) => {
                        const isNonClickableItem = isNonClickable(
                          segment.label
                        );
                        return (
                          <div key={index} className="py-1 text-sm">
                            {isNonClickableItem ? (
                              <span className="text-gray-500">
                                {capitalizeWords(segment.label)}
                              </span>
                            ) : (
                              <Link
                                to={segment.path}
                                className="dark:text-gray-200"
                              >
                                {capitalizeWords(segment.label)}
                              </Link>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button
                          variant="outline"
                          className="dark:text-gray-200"
                        >
                          Close
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : null}

        {/* Render last breadcrumbs (up to ITEMS_TO_DISPLAY) */}
        {pathSegments.slice(-ITEMS_TO_DISPLAY).map((segment, index, array) => {
          const isLast = index === array.length - 1;
          const isNonClickableItem = isNonClickable(segment.label);
          const label = capitalizeWords(segment.label);

          return (
            <BreadcrumbItem key={index}>
              {isLast ? (
                // Last breadcrumb should not be a link
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : isNonClickableItem ? (
                <>
                  <span className="text-gray-500">{label}</span>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link
                      to={segment.path}
                      className="max-w-20 truncate md:max-w-none"
                    >
                      {label}
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

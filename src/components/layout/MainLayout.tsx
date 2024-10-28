import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Button, SwipeableDrawer } from "@mui/material";
import { FunctionComponent, ReactNode, useState } from "react";
import { useAppSelector } from "../../store/store";
import { BlogPostEditor } from "../blogPost/BlogPostEditor";
import { Navbar } from "../navigation/Navbar";
import { UserIcon } from "../shared/UserIcon";

export type MainLayoutProps = {
    children: ReactNode
}

export const MainLayout: FunctionComponent<MainLayoutProps> = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isEditingBlogPost = useAppSelector((state) => state.blog.editingBlogPost !== undefined);
    const infoBarVisible = useAppSelector((state) => state.tour.showInfoBar) || isEditingBlogPost;

    return <div className="h-full main-layout flex flex-col">
        <div className="h-14">
            <AppBar sx={{ backgroundColor: '#282c34' }}>
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <Button onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <FontAwesomeIcon icon={faBars} />
                        </Button>
                    </div>
                    <div className='p-2 text-2xl md:text-3xl'>
                        CK Cycling Tour Viewer
                    </div>
                    <div>
                        <UserIcon />
                    </div>

                </div>
            </AppBar>
        </div>
        <div className="flex-1 flex flex-row flex-wrap">
            <SwipeableDrawer
                anchor="left"
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpen={() => setSidebarOpen(true)}
            >
                <div id="sidebar-content" className="w-44 h-full">
                    <div className="h-16 placeholder"></div>
                    <Navbar closeSidebar={() => setSidebarOpen(false)} />
                </div>
            </SwipeableDrawer>
            <div className="flex-1 ">
                {props.children}
            </div>
            <div id="info-sidebar" className={`${infoBarVisible ? 'open' : ''} overflow-clip p-2`}>
                {
                    isEditingBlogPost ? <BlogPostEditor /> : <></>
                }
            </div>
        </div>
    </div>
}
import { Link } from "react-router-dom";
import getDay from "../common/date";

const BlogPostCard = ({ content, author }) => {
    let { publishedAt, tags, title, banner, des, activity: { total_like }, blog_id: id } = content;
    let { fullname, username, profile_img } = author;

    return (
        <Link
            to={`/blog/${id}`}
            className="flex flex-col lg:flex-row gap-4 border border-grey p-4 mb-4 hover:shadow-md transition-shadow"
        >
            {/* Left section: Author info */}
            <div className="flex items-center gap-2 mb-2 lg:mb-0 lg:flex-col lg:items-start w-full lg:w-1/4">
                <img src={profile_img} alt={fullname} className="w-8 h-8 rounded-full" />
                <div className="flex flex-col">
                    <p className="text-sm font-medium">{fullname} @{username}</p>
                    <p className="text-xs text-gray-500">{getDay(publishedAt)}</p>
                </div>
            </div>

            {/* Middle section: Title, description, tags, likes */}
            <div className="flex-1 flex flex-col gap-2">
                <h1 className="blog-title text-lg font-bold">{title}</h1>
                <p className="text-base font-gelasio leading-6 line-clamp-2 md:line-clamp-2">
                    {des}
                </p>
                <div className="flex gap-3 items-center flex-wrap">
                    {Array.isArray(tags)
                        ? tags.map((tag, index) => (
                            <span key={index} className="btn-light py-1 px-3">{tag}</span>
                        ))
                        : <span className="btn-light py-1 px-3">{tags}</span>}
                    <span className="flex items-center gap-1 text-dark-grey">
                        <i className="fi fi-rr-heart text-xl"></i>
                        {total_like}
                    </span>
                </div>
            </div>

            {/* Right section: Banner image */}
            <div className="w-full lg:w-28 h-48 lg:h-28 flex-shrink-0 bg-grey mt-2 lg:mt-0">
                <img src={banner} alt={title} className="w-full h-full object-cover" />
            </div>
        </Link>
    );
}

export default BlogPostCard;


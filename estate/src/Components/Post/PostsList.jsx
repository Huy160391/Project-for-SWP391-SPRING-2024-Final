import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './PostCard';

const PostsListing = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { projectId } = useParams(); // Extract projectId from URL parameters

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://localhost:7137/api/Posts/ListPostByProjectID/${projectId}`);
        const postsWithBuildingNames = await Promise.all(response.data.map(async (post) => {
          try {
            const buildingResponse = await axios.get(`https://localhost:7137/api/Buildings/${post.buildingId}`);
            return { ...post, buildingName: buildingResponse.data.name };
          } catch (error) {
            console.error(`Error fetching building details for BuildingId: ${post.buildingId}`, error);
            return { ...post, buildingName: 'Unknown Building' }; // Handle error or absence of building name gracefully
          }
        }));
        setPosts(postsWithBuildingNames);
      } catch (error) {
        console.error("Error fetching posts for project ID:", projectId, error);
      }
      setIsLoading(false);
    };

    if (projectId) {
      fetchPosts();
    } else {
      console.error("No projectId provided");
      setIsLoading(false);
    }
  }, [projectId]); // Re-run the effect if projectId changes

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center">Không có bài post thuộc tòa nhà này</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} /> // Changed key from post.projectId to post.id for uniqueness
        ))}
      </div>
    </div>
  );
};

export default PostsListing;

import React from 'react';
import CommunityPostDetail from '../../features/community/components/CommunityPostDetail';

export default function CommunityDetailPage({ postId, onBack, user, onOpenLogin }) {
  return (
    <div className="container" style={{ padding: '40px 20px 60px 20px' }}>
      <CommunityPostDetail
        postId={postId}
        onBack={onBack}
        user={user}
        onOpenLogin={onOpenLogin}
      />
    </div>
  );
}

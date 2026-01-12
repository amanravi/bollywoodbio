'use client'

import { useState, useEffect } from 'react'
import { Post } from '@/lib/posts'
import styles from './PostForm.module.css'

interface PostFormProps {
  post: Post | null
  onSave: () => void
  onCancel: () => void
}

export default function PostForm({ post, onSave, onCancel }: PostFormProps) {
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    author: '',
    category: '',
    tags: [],
    isPublished: false,
    featured: false,
  })
  const [tagInput, setTagInput] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        tags: post.tags || [],
      })
    }
  }, [post])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({ ...prev, image: data.url }))
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      alert('Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || [],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const postData: Post = {
      id: post?.id || `post_${Date.now()}`,
      title: formData.title!,
      content: formData.content!,
      excerpt: formData.excerpt || '',
      image: formData.image || '',
      author: formData.author || '',
      publishedAt: post?.publishedAt || new Date().toISOString(),
      category: formData.category || '',
      tags: formData.tags || [],
      isPublished: formData.isPublished || false,
      featured: formData.featured || false,
    }

    try {
      const url = '/api/posts'
      const method = post ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        onSave()
      } else {
        alert('Failed to save post')
      }
    } catch (error) {
      alert('Error saving post')
    }
  }

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>{post ? 'Edit Post' : 'Create New Post'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Excerpt</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              placeholder="Short description for preview"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Content *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={10}
              required
              placeholder="Full article content"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., News, Review, Feature"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder="/images/post-image.jpg"
            />
            <div className={styles.uploadSection}>
              <label className={styles.uploadButton}>
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            {formData.image && (
              <img src={formData.image} alt="Preview" className={styles.imagePreview} />
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Tags</label>
            <div className={styles.tagsInput}>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add tag and press Enter"
              />
              <button type="button" onClick={handleAddTag} className={styles.addTagButton}>
                Add
              </button>
            </div>
            <div className={styles.tagsList}>
              {formData.tags?.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className={styles.removeTag}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                checked={formData.isPublished || false}
                onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
              />
              Published
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              />
              Featured
            </label>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton}>
              Save Post
            </button>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

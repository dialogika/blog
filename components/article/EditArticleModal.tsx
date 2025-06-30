"use client";
import React, { useEffect, useState } from "react";
import { BlogArticleProps } from "@/types";
import { Modal, Button, Form, Card } from "react-bootstrap";
import Link from "next/link";
import { formatDate } from "@/components/utils/date";
import { fetchArticles, searchArticlesByTitle } from "@/app/store/blogListSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";

// The allArticles prop is removed from here as it's no longer needed.
interface EditArticleModalProps {
  show: boolean;
  onHide: () => void;
  onLoadArticle: (article: BlogArticleProps) => void;
}

const EditArticleModal: React.FC<EditArticleModalProps> = ({ show, onHide, onLoadArticle }) => {
  // Get articles and status directly from the Redux store
  const allArticles = useSelector((state: RootState) => state.blogList.articles);
  const articleStatus = useSelector((state: RootState) => state.blogList.status);
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BlogArticleProps[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState<"idle" | "no_results" | "error">("idle");

  // Fetch articles via Redux if they haven't been loaded yet
  useEffect(() => {
    if (show && articleStatus === "idle") dispatch(fetchArticles());
  }, [show, articleStatus, dispatch]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setSearchStatus("idle");
      return;
    }

    setIsSearching(true);
    setSearchStatus("idle");

    try {
      // Dispatch the server-side search action
      const filteredArticles = await dispatch(searchArticlesByTitle(searchTerm)).unwrap();

      setSearchResults(filteredArticles);
      if (filteredArticles.length === 0) setSearchStatus("no_results");
    } catch (error) {
      console.error("Failed to search articles:", error);
      setSearchStatus("error");
    } finally {
      setIsSearching(false);
    }
  };

  const handleLoadClick = (article: BlogArticleProps) => {
    onLoadArticle(article);
    onHide();
  };

  // Clear search results when the modal is closed
  useEffect(() => {
    if (!show) {
      setSearchTerm("");
      setSearchResults([]);
      setSearchStatus("idle");
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Search and Edit Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSearch}>
          <div className="input-group mb-3">
            <Form.Control
              type="text"
              placeholder="Enter article title to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Article title"
            />
            <Button
              variant="outline-primary"
              type="submit"
              disabled={isSearching || articleStatus === "loading"}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </Form>

        <div
          className="mt-4"
          style={{ maxHeight: "50vh", overflowY: "auto" }}>
          {isSearching && <p className="text-center">Searching for articles...</p>}
          {!isSearching && searchStatus === "no_results" && (
            <p className="text-center text-muted">No articles found.</p>
          )}
          {!isSearching &&
            searchResults.map((article) => (
              <Card
                key={article.idArticle}
                className="mb-3 shadow-sm"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                <Card.Body>
                  <Card.Title className="fw-bold">{article.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    By: {article.authors.map((a) => a.authorName).join(", ")} | Published:{" "}
                    {formatDate(article.publishedAt)}
                  </Card.Subtitle>
                  <div className="d-flex gap-2 mt-3">
                    <Link
                      href={`/read/${article.idArticle}`}
                      passHref
                      target="_blank"
                      rel="noopener noreferrer">
                      <Button
                        variant="secondary"
                        size="sm">
                        View Article
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleLoadClick(article)}>
                      Load to Editor
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          {!isSearching && searchStatus === "error" && (
            <p className="text-center text-danger">Failed to search articles.</p>
          )}

          {articleStatus === "failed" && <p className="text-center text-danger">Failed to load articles.</p>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditArticleModal;

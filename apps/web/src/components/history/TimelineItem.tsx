import { useEffect, useMemo, useState } from "react";
import type { TimelineEvent } from "../../data/HistoryMockData";

type TimelineItemProps = {
  event: TimelineEvent;
  onOpenStory: (event: TimelineEvent) => void;
};

function TimelineItem({ event, onOpenStory }: TimelineItemProps) {
  const imageSources = useMemo(
    () =>
      [event.imageReferenceUrl, event.image].filter(
        (source, index, sources): source is string =>
          Boolean(source) && sources.indexOf(source) === index,
      ),
    [event.image, event.imageReferenceUrl],
  );
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [event.id, event.image, event.imageReferenceUrl]);

  function handleOpenStory() {
    onOpenStory(event);
  }

  function handleKeyDown(keyboardEvent: React.KeyboardEvent<HTMLDivElement>) {
    if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
      keyboardEvent.preventDefault();
      handleOpenStory();
    }
  }

  const currentImageSrc = imageSources[imageIndex];

  return (
    <article style={styles.timelineCard}>
      <div style={styles.timelineBadge}>{event.year}</div>

      <div
        aria-label={`Open full story for ${event.title}`}
        onClick={handleOpenStory}
        onKeyDown={handleKeyDown}
        role="button"
        style={styles.timelineContent}
        tabIndex={0}
        >
          <div>
            <h3 style={styles.timelineTitle}>{event.title}</h3>
            <p style={styles.timelineText}>{event.description}</p>
          <button
            onClick={(mouseEvent) => {
              mouseEvent.stopPropagation();
              handleOpenStory();
            }}
            style={styles.inlineLink}
            type="button"
          >
            {event.linkLabel}
          </button>
        </div>

        {currentImageSrc ? (
          <img
            alt={event.alt}
            onError={() => setImageIndex((current) => current + 1)}
            src={currentImageSrc}
            style={styles.timelineImage}
          />
        ) : (
          <div style={{ ...styles.timelineImage, ...styles.imageFallback }}>
            <span style={styles.timelinePlaceholderYear}>{event.year}</span>
          </div>
        )}

        <button
          aria-label={`Open timeline story for ${event.title}`}
          onClick={(mouseEvent) => {
            mouseEvent.stopPropagation();
            handleOpenStory();
          }}
          style={styles.iconButton}
          type="button"
        >
          +
        </button>
      </div>
    </article>
  );
}

const styles: Record<string, React.CSSProperties> = {
  timelineCard: {
    display: "grid",
    gridTemplateColumns: "52px 1fr",
    gap: "16px",
    alignItems: "start",
  },
  timelineBadge: {
    width: "40px",
    height: "40px",
    borderRadius: "999px",
    backgroundColor: "#0C2340",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.04em",
    marginTop: "22px",
  },
  timelineContent: {
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "18px",
    backgroundColor: "#ffffff",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 132px 38px",
    gap: "16px",
    alignItems: "center",
    cursor: "pointer",
    transition: "box-shadow 180ms ease, transform 180ms ease, border-color 180ms ease",
    outline: "none",
    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
  },
  timelineTitle: {
    color: "#0C2340",
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "6px",
  },
  timelineText: {
    color: "#6b7280",
    fontSize: "13px",
    lineHeight: 1.55,
    marginBottom: "10px",
  },
  inlineLink: {
    border: "none",
    background: "transparent",
    color: "#4B92DB",
    fontSize: "11px",
    fontWeight: 700,
    padding: 0,
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
  timelineImage: {
    width: "132px",
    height: "80px",
    borderRadius: "10px",
    objectFit: "cover",
    display: "block",
  },
  iconButton: {
    width: "38px",
    height: "38px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#0C2340",
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 180ms ease, background-color 180ms ease",
  },
  imageFallback: {
    background: "linear-gradient(135deg, #153865 0%, #4B92DB 100%)",
    color: "#ffffff",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "10px",
  },
  timelinePlaceholderYear: {
    fontSize: "22px",
    fontWeight: 800,
    letterSpacing: "0.08em",
  },
};

export default TimelineItem;

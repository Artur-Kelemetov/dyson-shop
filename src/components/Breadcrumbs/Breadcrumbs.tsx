import { Link, useMatches } from "react-router-dom"
import "./Breadcrumbs.scss"

type BreadcrumbHandle = {
  breadcrumb?: string
}

type BreadcrumbsProps = {
  className?: string,
  currentLabel?: string
}

const hasBreadcrumb = (handle: unknown): handle is BreadcrumbHandle => {
  return (
    typeof handle === "object" &&
    handle !== null &&
    "breadcrumb" in handle &&
    typeof handle.breadcrumb === "string"
  )
}

export const Breadcrumbs = ({ className, currentLabel }: BreadcrumbsProps) => {
  const matches = useMatches().filter((match) => hasBreadcrumb(match.handle))

  if (matches.length <= 1) {
    return null
  }

  return (
    <nav className={`breadcrumbs ${className}`} aria-label="Хлебные крошки">
      <ol className="breadcrumbs__list">
        {matches.map((match, index) => {
          const breadCrumb = (match.handle as BreadcrumbHandle).breadcrumb
          const isLastItem = index === matches.length - 1
          const label = isLastItem && currentLabel ? currentLabel : breadCrumb

          return (
            <li className="breadcrumbs__item" key={index}>
              {isLastItem ? (
                <span aria-current="page">{label}</span>
              ) : (
                <Link to={match.pathname}>{label}</Link>
              )
              }

              {!isLastItem && (
                <span className="breadcrumbs__separator" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
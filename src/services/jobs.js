import Api from "./api";

const _parseJobsListItem = (item) => {
  const {
    id,
    title,
    slug,
    company_name,
    short_description,
    long_description,
    category,
    location,
    experience,
    english,
    published,
    recruiter,
    is_favorite,
    is_online,
    dou_link,
    has_seen,
    has_applied,
    messagethread_url,
    views_count,
    applications_count,
  } = item;
  return {
    id,
    title,
    slug,
    hasSeen: has_seen,
    hasApplied: has_applied,
    company: {
      name: company_name,
      website: recruiter && recruiter.employer_website,
      about: recruiter && recruiter.employer_about,
      dou: dou_link,
    },
    description: short_description,
    fullDescription: long_description,
    category,
    location,
    experience,
    language: english,
    publicationDate: published,
    recruiter: {
      id: recruiter && recruiter.id,
      name: recruiter && recruiter.name,
      picture: recruiter && recruiter.picture_url,
      headline: recruiter && recruiter.linkedin_headline,
      position: recruiter && recruiter.position,
      url: recruiter && recruiter.public_url,
      badge: recruiter && recruiter.badge,
    },
    isFavorite: is_favorite,
    isOnline: is_online,
    messageThreadUrl: messagethread_url,
    viewsCount: views_count,
    applicationsCount: applications_count,
  };
};

export const getJob = async (id, fetchHandler, headers = {}) => {
  const result = await Api.call(`/jobs/${id}`, { headers }, fetchHandler);
  if (!result.error && result.data) {
    return {
      data: _parseJobsListItem(result.data),
    };
  }
  return result;
};

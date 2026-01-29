// import { z } from "zod";
import Joi from "joi";
export const createArticleSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  description: Joi.string().min(10).required(),
});

export const updateArticleSchema = Joi.object({
  title: Joi.string().min(2).max(200),
  description: Joi.string().min(10),
});

export const registerSchema = Joi.object({
  username: Joi.string().min(2).max(200).required(),
  email: Joi.string().min(10).max(200).email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().min(10).max(200).email().required(),
  password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(2).max(100),
  email: Joi.string().min(10).max(200).email(),
  password: Joi.string().min(6),
});

export const createCommentShema = Joi.object({
  text: Joi.string().min(2).max(500).required(),
  articleId: Joi.number().required(),
});

export const updateCommentShema = Joi.object({
  text: Joi.string().min(2).max(500).required(),
});

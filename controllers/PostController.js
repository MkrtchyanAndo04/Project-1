import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ne udalos poluchit statey" });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        $inc: {
          viewsCount: 1,
        },
      },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post ne nayden" });
    }
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ne udalos nayti posts" });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err),
      res.status(500).json({ message: "Ne udalos sozdat post" });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: "Takogo posta netu" });
    }
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ne udalos udalit post" });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      },
      { new: true }
    );
    if (!updatedPost) {
      res.status("404").json({ message: "Ne udalos nayti post" });
    }
    res.json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ne udalos" });
  }
};

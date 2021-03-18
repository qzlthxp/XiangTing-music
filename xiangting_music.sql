-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2021-03-18 16:46:02
-- 服务器版本： 5.6.49-log
-- PHP 版本： 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `xiangting_music`
--

-- --------------------------------------------------------

--
-- 表的结构 `hot_play_lists`
--

CREATE TABLE `hot_play_lists` (
  `id` int(11) NOT NULL,
  `play_lists_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

--
-- 转存表中的数据 `hot_play_lists`
--

INSERT INTO `hot_play_lists` (`id`, `play_lists_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(5, 5),
(6, 6),
(7, 7),
(8, 8);

-- --------------------------------------------------------

--
-- 表的结构 `play_lists`
--

CREATE TABLE `play_lists` (
  `play_lists_id` int(11) NOT NULL,
  `play_lists_title` varchar(255) NOT NULL,
  `play_lists_introduce` mediumtext NOT NULL,
  `play_lists_poster` varchar(255) NOT NULL,
  `play_number` varchar(255) NOT NULL,
  `publishTime` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `private` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `play_lists`
--

INSERT INTO `play_lists` (`play_lists_id`, `play_lists_title`, `play_lists_introduce`, `play_lists_poster`, `play_number`, `publishTime`, `user_id`, `private`) VALUES
(1, '“唱功大挑战，来互相伤害啊！”', '一首歌最大的魅力在于可以感染人心，平铺直叙、缓缓道来可以，撕裂嗓音、突破人类极限也同样可以。有些歌曲为了配合所传达的精神内涵或主观情绪，出于各种各样的原因需要演唱者走出自己的舒适圈，将自己的演唱功力拔高到极限以外的水平。 歌单整理了比较难唱的歌曲，有的有着非人类的高音，有的有着奇妙的唱腔，有的则是快节奏的语速…你觉得这些歌曲的难度如何呢？有没有成功挑战过的歌曲呢？没有挑战的朋友记得在KTV尝试一下哦', '/image/defaultplaylistsposter1.jpg', '56', '1614833188183', 4, 0),
(2, '网络热歌分享｜这就是你的排行榜', '本来想写一大堆的话告诉我的粉丝们，对我来说你们有多重要。后来我写了改，改了又写，最后发现原来我想表达的，只有这几个字，留在我身边，听我分享的歌，不论过去多少年。 推荐一些热歌，我喜欢的，我相信你们也会喜欢！！！', '/image/defaultplaylistsposter2.jpg', '12', '1614833188183', 1, 0),
(3, 'live | 走心演绎，百听不厌', 'live更能表达出一个歌手的情绪，人的感情随着现场音乐和气氛变化。每一首live都会给人不一样的感觉，这里面不仅可以听到歌手的歌声，还可以听到歌迷的尖叫、合唱，快歌能跟着一起嗨，而慢歌也会偷偷抽泣，能感受到现场的氛围，也是一种不错的体验。', '/image/defaultplaylistsposter3.jpg', '90', '1614833188183', 4, 0),
(5, '哼首老歌送别年少的你', '幸福就是走在华灯初上的傍晚，经过一家音像店时正好响起一首久违的老歌。于是停住脚步将歌听完，许多美丽遥远的回忆在脑海中渐渐清晰起来。 ​ 不是老歌变好听了，而是你的心里有故事了！   我没有很刻意的去想你，只是在很多很多时候看一部电影听一首老歌，穿过拥挤人潮和无数个辗转反侧的夜晚，都会想起你。 推荐的老歌，越老越有味道，送你的，送你们的。 封面源自网络 ', '/image/defaultplaylistsposter5.jpg', '2', '1614833188183', 1, 0),
(6, '伤感之季：终究成为熟悉的陌生人', '爱情就像我手里这根烟，抽的多了，也就淡了，时间久了会上瘾，想开了也就不抽了，因为它伤身…', '/image/defaultplaylistsposter6.jpg', '5', '1614833188183', 4, 0),
(7, '影视金曲 |每首歌都藏着一段故事', '一首歌曲的背后都是一个故事，都有自己独特的意义：可以是一往情深的动人爱情，或可以是感人肺腑的暖心亲情；或可以是不懈追梦的努力坚持。 影视剧中的歌曲更是如此，动人的情节加上感人的主题曲，不得不让人印象深刻。', '/image/defaultplaylistsposter7.jpg', '5', '1614833188183', 1, 0),
(8, '沉浸字符间：学习专用纯音', '学习时听一首好听的纯音乐能提神醒脑，让你下笔如有神。这些歌都是我精心挑选出来的，助你学习愉快。', '/image/defaultplaylistsposter8.jpg', '1', '1614833188183', 4, 0),
(27, '刺客信条背景音乐', '冲冲冲', '/user_upload_play_lists_poster/1/1616032649534.jpg', '1', '1616032715705', 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `play_lists_cate`
--

CREATE TABLE `play_lists_cate` (
  `play_lists_id` int(11) NOT NULL,
  `play_lists_detail_cate_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

--
-- 转存表中的数据 `play_lists_cate`
--

INSERT INTO `play_lists_cate` (`play_lists_id`, `play_lists_detail_cate_id`) VALUES
(1, 1),
(1, 22),
(1, 33),
(1, 36),
(2, 4),
(2, 36),
(3, 3),
(3, 36),
(5, 5),
(6, 14),
(6, 22),
(7, 7),
(8, 9),
(8, 16),
(8, 24),
(27, 4),
(27, 10);

-- --------------------------------------------------------

--
-- 表的结构 `play_lists_detail_cate`
--

CREATE TABLE `play_lists_detail_cate` (
  `play_lists_detail_cate_id` int(11) NOT NULL,
  `play_lists_detail_cate_name` varchar(255) NOT NULL,
  `play_lists_main_cate_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `play_lists_detail_cate`
--

INSERT INTO `play_lists_detail_cate` (`play_lists_detail_cate_id`, `play_lists_detail_cate_name`, `play_lists_main_cate_id`) VALUES
(1, 'KTV金曲', 12),
(2, '网络歌曲', 12),
(3, '现场音乐', 12),
(4, '背景音乐', 12),
(5, '经典老歌', 12),
(6, '情歌', 12),
(7, '影视', 12),
(9, '学习工作', 13),
(10, '运动', 13),
(11, '睡前', 13),
(12, '旅行', 13),
(13, '排队', 13),
(14, '伤感', 14),
(15, '快乐', 14),
(16, '安静', 14),
(17, '励志', 14),
(18, '思念', 14),
(19, '00年代', 15),
(20, '90年代', 15),
(21, '80年代', 15),
(22, '流行', 16),
(23, '电子', 16),
(24, '轻音乐', 16),
(25, '民谣', 16),
(26, '说唱', 16),
(27, '摇滚', 16),
(28, '中国风', 16),
(29, '英语', 17),
(30, '粤语', 17),
(31, '韩语', 17),
(32, '日语', 17),
(33, '国语', 17),
(34, '小语种', 17),
(35, '法语', 17),
(36, '精选歌单', 1);

-- --------------------------------------------------------

--
-- 表的结构 `play_lists_main_cate`
--

CREATE TABLE `play_lists_main_cate` (
  `play_lists_main_cate_id` int(11) NOT NULL,
  `play_lists_main_cate_name` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `play_lists_main_cate`
--

INSERT INTO `play_lists_main_cate` (`play_lists_main_cate_id`, `play_lists_main_cate_name`) VALUES
(12, '主题'),
(13, '场景'),
(14, '心情'),
(15, '年代'),
(16, '流派'),
(17, '语种'),
(1, '默认');

-- --------------------------------------------------------

--
-- 表的结构 `song`
--

CREATE TABLE `song` (
  `user_song_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `publishTime` varchar(255) DEFAULT NULL,
  `private` int(11) DEFAULT NULL,
  `play_number` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `song`
--

INSERT INTO `song` (`user_song_id`, `user_id`, `name`, `url`, `publishTime`, `private`, `play_number`) VALUES
(11, 1, '雨滴声', '/user_upload_song/1/雨滴声.mp3', '1615726260815', 0, '0'),
(12, 1, '黎明时窗外的鸟叫声', '/user_upload_song/1/黎明时窗外的鸟叫声.mp3', '1615726267737', 0, '1'),
(13, 1, NULL, '/user_upload_song/1/.mp3', '1615780602090', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `song_of_play_lists`
--

CREATE TABLE `song_of_play_lists` (
  `play_lists_id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

--
-- 转存表中的数据 `song_of_play_lists`
--

INSERT INTO `song_of_play_lists` (`play_lists_id`, `song_id`) VALUES
(1, 26305527),
(1, 1804879213),
(2, 133998),
(2, 27678655),
(2, 27731172),
(2, 27731174),
(2, 27731176),
(2, 27731177),
(2, 27731179),
(2, 29710981),
(2, 29764561),
(2, 29764562),
(2, 29764563),
(2, 29764564),
(2, 29764565),
(2, 29764569),
(2, 31134170),
(2, 31134193),
(2, 31134197),
(2, 31654343),
(2, 31877243),
(2, 400074326),
(2, 407450218),
(2, 407450223),
(2, 407459147),
(2, 407459148),
(2, 428375722),
(2, 486323960),
(2, 502242110),
(2, 506092654),
(2, 511920347),
(2, 515143802),
(2, 518686034),
(2, 519250024),
(2, 570334069),
(2, 862130427),
(2, 1293886117),
(2, 1305547844),
(2, 1308818966),
(2, 1309866644),
(2, 1318234987),
(2, 1318235595),
(2, 1407551413),
(2, 1410490187),
(2, 1415566662),
(2, 1418319771),
(2, 1420575583),
(2, 1430224832),
(2, 1442031605),
(2, 1449782659),
(2, 1452439191),
(2, 1460930236);

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_photo` varchar(255) DEFAULT NULL,
  `user_bg` varchar(255) DEFAULT NULL,
  `user_qming` varchar(255) DEFAULT NULL,
  `user_token` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_password`, `user_phone`, `user_email`, `user_photo`, `user_bg`, `user_qming`, `user_token`) VALUES
(1, '抢走辣条还想跑', 'ccqccq', '15961178386', '985234173@qq.com', '/user_upload_photo/1/1.png?1615946231', '/user_upload_bg/1/1.jpg', '想听音乐，享听音乐', '985234173'),
(4, '一颗芒果', 'ccqccq', '2147483647', '2902587206@qq.com', '/image/defaultphoto5.png', '/image/defaultuserbg.jpg', '个性签名', '2902587206'),
(5, '这是王涵', '123456', NULL, '1737976717@qq.com', '/user_upload_photo/5/5.jpg?1615090061', '/user_upload_bg/5/5.jpg', 'woshisb', '17379767171615089991007');

-- --------------------------------------------------------

--
-- 表的结构 `user_like_play_lists`
--

CREATE TABLE `user_like_play_lists` (
  `user_id` int(11) NOT NULL,
  `play_lists_id` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

--
-- 转存表中的数据 `user_like_play_lists`
--

INSERT INTO `user_like_play_lists` (`user_id`, `play_lists_id`) VALUES
(1, '3');

-- --------------------------------------------------------

--
-- 表的结构 `user_like_singer`
--

CREATE TABLE `user_like_singer` (
  `user_id` int(11) NOT NULL,
  `singer_id` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

--
-- 转存表中的数据 `user_like_singer`
--

INSERT INTO `user_like_singer` (`user_id`, `singer_id`) VALUES
(1, '126277'),
(1, '31165848'),
(1, '4292'),
(1, '5781');

-- --------------------------------------------------------

--
-- 表的结构 `user_like_song`
--

CREATE TABLE `user_like_song` (
  `user_id` int(11) NOT NULL,
  `song_id` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

--
-- 转存表中的数据 `user_like_song`
--

INSERT INTO `user_like_song` (`user_id`, `song_id`) VALUES
(1, '1369609133'),
(1, '1407551413'),
(1, '1815389717'),
(1, '407450223'),
(1, '574566207');

--
-- 转储表的索引
--

--
-- 表的索引 `hot_play_lists`
--
ALTER TABLE `hot_play_lists`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- 表的索引 `play_lists`
--
ALTER TABLE `play_lists`
  ADD PRIMARY KEY (`play_lists_id`) USING BTREE;

--
-- 表的索引 `play_lists_cate`
--
ALTER TABLE `play_lists_cate`
  ADD PRIMARY KEY (`play_lists_id`,`play_lists_detail_cate_id`) USING BTREE;

--
-- 表的索引 `play_lists_detail_cate`
--
ALTER TABLE `play_lists_detail_cate`
  ADD PRIMARY KEY (`play_lists_detail_cate_id`) USING BTREE;

--
-- 表的索引 `play_lists_main_cate`
--
ALTER TABLE `play_lists_main_cate`
  ADD PRIMARY KEY (`play_lists_main_cate_id`) USING BTREE;

--
-- 表的索引 `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`user_song_id`) USING BTREE;

--
-- 表的索引 `song_of_play_lists`
--
ALTER TABLE `song_of_play_lists`
  ADD PRIMARY KEY (`play_lists_id`,`song_id`) USING BTREE;

--
-- 表的索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`) USING BTREE;

--
-- 表的索引 `user_like_play_lists`
--
ALTER TABLE `user_like_play_lists`
  ADD PRIMARY KEY (`user_id`,`play_lists_id`) USING BTREE;

--
-- 表的索引 `user_like_singer`
--
ALTER TABLE `user_like_singer`
  ADD PRIMARY KEY (`user_id`,`singer_id`) USING BTREE;

--
-- 表的索引 `user_like_song`
--
ALTER TABLE `user_like_song`
  ADD PRIMARY KEY (`user_id`,`song_id`) USING BTREE;

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `hot_play_lists`
--
ALTER TABLE `hot_play_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `play_lists`
--
ALTER TABLE `play_lists`
  MODIFY `play_lists_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- 使用表AUTO_INCREMENT `play_lists_detail_cate`
--
ALTER TABLE `play_lists_detail_cate`
  MODIFY `play_lists_detail_cate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- 使用表AUTO_INCREMENT `play_lists_main_cate`
--
ALTER TABLE `play_lists_main_cate`
  MODIFY `play_lists_main_cate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- 使用表AUTO_INCREMENT `song`
--
ALTER TABLE `song`
  MODIFY `user_song_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

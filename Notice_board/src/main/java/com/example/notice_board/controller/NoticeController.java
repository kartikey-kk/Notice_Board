package com.example.notice_board.controller;

import com.example.notice_board.model.Notice;
import com.example.notice_board.service.NoticeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notices")
public class NoticeController {

    private final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    // POST /notices
    @PostMapping
    public String createNotice(@RequestBody Notice notice) {
        noticeService.addNotice(notice);
        return "Notice added successfully";
    }

    // GET /notices
    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }

    // PUT /notices/{id}
    @PutMapping("/{id}")
    public String updateNotice(@PathVariable int id,
                               @RequestBody Notice notice) {
        noticeService.updateNotice(id, notice);
        return "Notice updated successfully";
    }

    // DELETE /notices/{id}
    @DeleteMapping("/{id}")
    public String deleteNotice(@PathVariable int id) {
        noticeService.deleteNotice(id);
        return "Notice deleted successfully";
    }
}

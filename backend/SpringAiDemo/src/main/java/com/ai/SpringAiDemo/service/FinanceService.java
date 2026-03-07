package com.ai.SpringAiDemo.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class FinanceService {

  private final ChatModel chatModel;

  public FinanceService(ChatModel chatModel) {
    this.chatModel = chatModel;
  }

  public String getFinancialAdvice(String query) {
    var template = """
            You are a highly knowledgeable and professional financial advisor.
            Provide advice on the following query: {query}.
            Make the response clear, concise, and actionable.
        """;

    PromptTemplate promptTemplate = new PromptTemplate(template);
    Map<String, Object> params = Map.of("query", query);

    Prompt prompt = promptTemplate.create(params);
    return chatModel.call(prompt).getResult().getOutput().getContent();
  }
}

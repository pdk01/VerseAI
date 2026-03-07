package com.ai.SpringAiDemo.controller;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ai.SpringAiDemo.service.ChatService;
import com.ai.SpringAiDemo.service.FinanceService;
import com.ai.SpringAiDemo.service.ImageService;
import com.ai.SpringAiDemo.service.RecipeService;

import jakarta.servlet.http.HttpServletResponse;

@RestController

public class GenAIController {
  private final ChatService chatService;
  private final ImageService imageService;
  private final RecipeService recipeService;
  private final FinanceService financeService;

  public GenAIController(ChatService chatService, ImageService imageService, RecipeService recipeService,
      FinanceService financeService) {
    this.chatService = chatService;
    this.imageService = imageService;
    this.recipeService = recipeService;
    this.financeService = financeService;
  }

  @GetMapping("/ask-ai")
  public String getResponse(@RequestParam String prompt) {
    return chatService.getResponse(prompt);
  }
  // public String response() {
  // return "hello";
  // }

  @GetMapping("/ask-ai-options")
  public String getResponseOptions(@RequestParam String prompt) {
    return chatService.getResponseOptions(prompt);
  }

  // @GetMapping("generate-image")
  // public void generateImages(HttpServletResponse response, @RequestParam String
  // prompt) throws IOException {
  // ImageResponse imageResponse = imageService.generateImage(prompt);
  // String imageUrl = imageResponse.getResult().getOutput().getUrl();
  // response.sendRedirect(imageUrl);
  // }

  @GetMapping("generate-image")
  public List<String> generateImages(HttpServletResponse response,
      @RequestParam String prompt,
      @RequestParam(defaultValue = "hd") String quality,
      @RequestParam(defaultValue = "1") int n,
      @RequestParam(defaultValue = "1024") int width,
      @RequestParam(defaultValue = "1024") int height) throws IOException {
    ImageResponse imageResponse = imageService.generateImage(prompt, quality, n, width, height);

    // Streams is going to used for getting urls from ImageResponse for multiple
    // image generations
    List<String> imageUrls = imageResponse.getResults().stream()
        .map(result -> result.getOutput().getUrl())
        .toList();

    return imageUrls;

  }

  @GetMapping("recipe-creator")
  public String recipeCreator(@RequestParam String ingredients,
      @RequestParam(defaultValue = "any") String cuisine,
      @RequestParam(defaultValue = "") String dietaryRestrictions) {

    return recipeService.createRecipe(ingredients, cuisine, dietaryRestrictions);
  }

  @GetMapping("financial-advice")
  public String getFinancialAdvice(@RequestParam String query) {
    return financeService.getFinancialAdvice(query);
  }

}

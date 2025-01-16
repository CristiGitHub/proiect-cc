package com.fmi.demo.exposition.resources;
import com.fmi.demo.domain.model.ConfirmationDataSet;
import com.fmi.demo.exposition.ICommand.ConfirmationDataSetCommandImpl;
import com.fmi.demo.exposition.IQuerry.ConfirmationDataSetQuerryImpl;
import com.fmi.demo.exposition.exceptions.CustomErrorHandler;
import com.fmi.demo.exposition.exceptions.ExceptionEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/save", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
@Slf4j
public class ConfirmationResource {

	@Autowired
	private  ConfirmationDataSetQuerryImpl confirmationDataSetQuerry;

	@Autowired
	private  ConfirmationDataSetCommandImpl confirmationDataSetCommand;


	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createConfirmationDataSet(@RequestBody ConfirmationDataSet confirmationDataSet){
		String confirmationId = confirmationDataSetCommand.save(confirmationDataSet);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body("ConfirmationDataSet created with ID: " + confirmationId);
	}
}

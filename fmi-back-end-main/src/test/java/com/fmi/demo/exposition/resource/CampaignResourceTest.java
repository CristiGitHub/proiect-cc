import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import com.fmi.demo.domain.model.SavedOutfits;
import com.fmi.demo.domain.repository.SavedOutfitsRepository;
import com.fmi.demo.exposition.resources.SavedOutfitsResource;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class SavedOutfitsControllerTest {

    @Autowired
    private SavedOutfitsResource controller;

    @MockBean
    private SavedOutfitsRepository service;

    @Test
    @Sql("/sql/data.sql")
    public void testGetSavedOutfitById() {
        String testId = "someId";
        SavedOutfits expectedOutfit = new SavedOutfits();
        when(service.getById(testId)).thenReturn(Optional.of(expectedOutfit));

        ResponseEntity<SavedOutfits> response = controller.getSavedOutfitById(testId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedOutfit, response.getBody());
        verify(service).getById(testId);
    }


    @Test
    @Sql("/sql/data.sql")
    public void testGetAllSavedOutfitsByUser() {
        List<SavedOutfits> expectedOutfitsList = new ArrayList<>();
        when(service.getAll(anyString())).thenReturn(expectedOutfitsList);

        ResponseEntity<List<SavedOutfits>> response = controller.getSavedOutfitById();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedOutfitsList, response.getBody());
        verify(service).getAll(anyString());
    }
    @Test
    @Sql("/sql/data.sql")
    public void testDeleteSavedOutfit() {
        String testId = "test123";
        doNothing().when(service).delete(testId);
        ResponseEntity<?> response = controller.deleteSavedOutfit(testId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(service).delete(testId);
    }



}

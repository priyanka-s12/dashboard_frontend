import Sidebar from '../components/Sidebar';
import useLead from '../contexts/LeadContext';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxios from '../custom/useAxios';
import axios from 'axios';

function LeadDetails() {
  const { id } = useParams();
  // console.log(id);

  const [comment, setComment] = useState({
    lead: '',
    author: '',
    commentText: '',
  });

  const { leads, loading, getLeads } = useLead();
  // console.log(leads);

  const findLead = leads?.find((lead) => lead._id === id);
  // console.log(findLead);

  const { data: comments, getData: getComments } = useAxios(
    `https://anvaya-dashboard-backend.vercel.app/api/leads/${id}/comments`
  );
  // console.log(comments);

  const handleAddComment = async (e) => {
    e.preventDefault();
    // console.log(comment);

    try {
      const response = await axios.post(
        `https://anvaya-dashboard-backend.vercel.app/api/leads/${id}/comments`,
        comment
      );

      console.log('Added comment', response);
      setComment({
        lead: '',
        author: '',
        commentText: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeads();
  }, [id]);

  useEffect(() => {
    if (comment) {
      getComments();
    }
  }, [comment]);

  return (
    <>
      <div className="row">
        <div className="col-md-2 min-vh-100 shadow p-3 mb-3 bg-body-tertiary rounded">
          <Sidebar />
        </div>
        <div className="col-md-10 p-3 mb-5">
          <main className="container-fluid">
            <section>
              {findLead ? (
                <div>
                  <h3 className="mb-3">Lead Management - {findLead.name}</h3>
                  <hr />
                  <h4 className="mb-3">Lead Details</h4>
                  <table className="table table-bordered w-75">
                    <tbody>
                      <tr>
                        <th>Lead Name: </th>
                        <td>{findLead.name}</td>
                      </tr>
                      <tr>
                        <th>Sales Agent: </th>
                        <td>{findLead.salesAgent.name}</td>
                      </tr>
                      <tr>
                        <th>Lead Source: </th>
                        <td>{findLead.source}</td>
                      </tr>
                      <tr>
                        <th>Lead Status: </th>
                        <td>{findLead.status}</td>
                      </tr>
                      <tr>
                        <th>Priority: </th>
                        <td>{findLead.priority}</td>
                      </tr>
                      <tr>
                        <th>Time to close: </th>
                        <td>{findLead.timeToClose} Days</td>
                      </tr>
                      <tr>
                        <th>Tags: </th>
                        <td>
                          {findLead.tags.map((tag, index) => (
                            <button
                              className="btn btn-outline-primary me-2"
                              key={index}
                            >
                              {tag}
                            </button>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <Link
                      className="btn btn-primary"
                      to={`/edit-lead/${findLead._id}`}
                      state={findLead}
                    >
                      Edit Lead Details
                    </Link>
                  </div>
                  <hr />

                  <section className="container">
                    <h5 className="mb-3">Comments: </h5>
                    <form onSubmit={handleAddComment}>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Add your comment here..."
                        value={comment.commentText}
                        required
                        onChange={(e) =>
                          setComment((prev) => ({
                            ...prev,
                            lead: findLead._id,
                            author: findLead?.salesAgent._id,
                            commentText: e.target.value,
                          }))
                        }
                      ></textarea>
                      <button className="btn btn-primary mt-3" type="submit">
                        Add Comment
                      </button>
                    </form>

                    <ul className="mt-3 list-group">
                      {comments?.map((item) => (
                        <li key={item._id} className="list-group-item">
                          <p className="fw-medium">
                            {item.author.name}
                            {' - '}
                            <span className="fw-normal">
                              {new Date(item.createdAt).toLocaleString('en-US')}
                            </span>
                          </p>
                          <p>{item.commentText}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              ) : (
                <>{loading && <p>Loading...</p>}</>
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default LeadDetails;
